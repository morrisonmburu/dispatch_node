/** calling the database watcher function */
module.exports = io => {

const sql = require("../models/db.js");
const Orders = require("../models/orders.model.js");

const MySQLEvents = require('@rodrigogs/mysql-events');
const ora = require('ora');

/** creating a console spinner when watching for database changes */
const spinner = ora({
    text: 'Waiting for database events...',
    color: 'blue',
    spinner: 'dots2',
});

io.on('connect', socket => {
  console.log('Socket connected');
});

/** the heart of everything -> async await function for watching database changes in realtime */
const program = async () => {
    const instance = new MySQLEvents(sql, {
      startAtEnd: true,
      excludedSchemas: {
        mysql: true,
      },
    });
  
    await instance.start()
  
    instance.addTrigger({
      name: 'monitoring all statements',
      expression: '*',
      statement: MySQLEvents.STATEMENTS.INSERT,
      onEvent: (e) => {
        // eslint-disable-next-line no-unused-expressions
        /** emiting orders table data to the socket client i.e the frontend */
        if (e.schema === 'volant' && e.table === 'orders') {
          console.log(e.affectedRows[0].after.id)
          io.emit('orderInserts', e.affectedRows[0].after.id)
          if (e.affectedRows[0].after.category_id === 3) {
            io.emit('insertMoves', e.affectedRows[0].after.id)
          }
          spinner.succeed('_ORDER INSERT EVENT_');
          spinner.start();
        } else if (e.schema === 'volant' && e.table === 'couriers') {
          io.emit('ridersInserts', e.affectedRows[0].after)
          spinner.succeed('_ASSOCIATE INSERT EVENT_');
          spinner.start();
        }
    
      },
    });

      instance.addTrigger({
        name: 'monitoring all statements',
        expression: '*',
        statement: MySQLEvents.STATEMENTS.UPDATE,
        onEvent: (e) => {
          // eslint-disable-next-line no-unused-expressions
          /** emiting orders table data to the socket client i.e the frontend */
          if (e.schema === 'volant' && e.table === 'orders') {
            if(e.affectedRows[0].after.status === 4){
              io.emit('orderComplete', e.affectedRows[0].after)
            }
            spinner.succeed('_UPDATE EVENT_');
            spinner.start();
          } else if (e.schema === 'volant' && e.table === 'couriers') {
            console.log(e.affectedRows[0])
            if(e.affectedRows[0].before.status === 0 && e.affectedRows[0].after.status === 1){
              io.emit('ridersUpdatesActive', e.affectedRows[0].after)
            }
            if(e.affectedRows[0].before.is_online == 0 && e.affectedRows[0].after.is_online === 1){
              io.emit('ridersUpdatesOnline', e.affectedRows[0].after)
            }
            if(e.affectedRows[0].before.is_online == 1 && e.affectedRows[0].after.is_online === 0){
              io.emit('ridersUpdatesOffline', e.affectedRows[0].after)
            }
            spinner.succeed('_ASSOCIATE UPDATE EVENT_');
            spinner.start();
          }
        },
      });
  
    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
  };


  program()
    .then(spinner.start.bind(spinner))
    // eslint-disable-next-line no-console
    .catch(console.error)
}

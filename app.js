const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const session = require('express-session');

app.use(session({
    secret: 'Keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
}));

const server = require('http').Server(app);

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: "Welcome To Rest Api." });
});

const io = require('socket.io')(server);

require("./routes/orders.routes.js")(app);
require("./routes/associates.routes.js")(app);
require("./routes/dispatchRoutes.routes.js")(app);
require("./routes/autoassign.routes.js")(app);
require("./routes/login.routes.js")(app);
require('./watcher/main.watcher.js')(io);

server.listen(port, () => {
    console.log(`Server is running on ${port}.`);
});
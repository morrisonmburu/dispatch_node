const sql = require("./db.js");
const Options = require("../options/orders.options.js");
const Options2 = require('../options/associates.options.js');
const Extra = require('../controllers/extraItems.controller.js');

const Dispatch = function(dispatch) {};

Dispatch.dispatchOrder = (data, result) => {
    const global = {}
    const dataDispatches = {
        dispatchno: Extra.uuidv4(),
        orderNo: data.orderNo,
        driverNo: data.AssociateId,
        customerName: data.customerName,
        DriverName: data.label,
        DriverPhone: data.driverPhone,
        plateNumber: data.plateNumber,
        from: data.origin,
        to: data.destination,
        package: data.package,
        amount: data.price,
        status: 0,
        created_at: Extra.createdTime()
    }

    sql.query(Options2.insertDispatchOptions, dataDispatches, (errors, results) => {
        if (errors) {
            console.log("errors: ", errors)
            result(null, errors)
            return
        } else {
            global.insertDispatch = results
        }
    })

    sql.query(Options2.updateCouriersOptions, [data.AssociateId], (errors, results) => {
        if (errors) {
            console.log("errors: ", errors)
            result(null, errors)
            return
        } else {
            global.updateCouriers = results
        }
    })

    sql.query(Options.updateOrderOptions, [data.orderNo], (errors, results) => {
        if (errors) {
          console.log("errors: ", errors);
          result(null, errors);
          return;
        } else {
            global.updateOrder = results
        }
      })

    sql.query(Options.findOrderOptions, [data.orderNo], (errors, results) => {
        if (errors) {
            console.log("errors: ", errors);
            result(null, errors);
            return;
          } else {
              const send = [
                  { insertDispatch: global.insertDispatch },
                  { updateCouriers: global.updateCouriers },
                  { updateOrder: global.updateOrder },
                  { order: results }
              ]
            result(null, send)
          }
    })
}

Dispatch.dispatchOrderReassign = (data, result) => {
    const global = {}

    sql.query(Options.updateDispatches, [data.label, data.driverPhone, data.orderNo], (errors, results) => {
        if (errors) {
            console.log("errors: ", errors)
            result(null, errors)
            return
        } else {
            global.insertDispatch = results
        }
    })

    sql.query(Options.findDispatches, [data.orderNo], (errors, results) => {
        if (errors) {
            console.log("errors: ", errors)
            result(null, errors)
            return
        } else {
            global.findDispatches = results
        }
    })

    sql.query(Options2.updateCouriersOptions, [data.AssociateId], (errors, results) => {
        if (errors) {
            console.log("errors: ", errors)
            result(null, errors)
            return
        } else {
            global.updateCouriers = results
        }
    })

    sql.query(Options.findOrderOptions, [data.orderNo], (errors, results) => {
        if (errors) {
            console.log("errors: ", errors);
            result(null, errors);
            return;
          } else {
            global.orderOne = results
          }
    })

    sql.query(Options.updateOrderOptions, [data.orderNo], (errors, results) => {
        if (errors) {
          console.log("errors: ", errors);
          result(null, errors);
          return;
        } else {
            const send = [
                { insertDispatch: global.insertDispatch },
                { updateCouriers: global.updateCouriers },
                { updateOrder: results },
                { findDispatches: global.findDispatches },
                { order: global.orderOne }
            ]
          result(null, send)
        }
      })
}

module.exports = Dispatch;

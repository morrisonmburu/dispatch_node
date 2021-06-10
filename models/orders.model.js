const sql = require("./db.js");
const Options = require("../options/orders.options.js");
// constructor
const Orders = function(order) {};

/** sorting algorithm for sorting and removing all our duplicate entries */
function trySort(array) {
  let previousId = 0;
  const showOrders = [];
  array.forEach((i, index) => {
    i.origin = [];
    i.destination = i.name;
    if (previousId === i.id) {
      const minKey = index - 1;
      if (array[minKey].origin.length !== 0) {
        i.origin = i.origin.concat(array[minKey].origin);
      } else {
        i.origin.push(i.destination, array[minKey].name);
      }
      showOrders.push(array[minKey + 1]);
    } else {
      i.origin.push(i.destination);
    }
    previousId = i.id;
  });
  return showOrders;
}

Orders.getAll = result => {
  sql.query(Options.optionsAll, (errors, results) => {
    if (errors) {
      console.log("error: ", errors);
      result(null, errors);
      return;
    } else {
      result(null, trySort(results));
    }
  });
};

Orders.getUnassigned = result => {
  sql.query(Options.optionsStatus, [0], (errors, results) => {
    if (errors) {
      console.log("error: ", errors);
      result(null, errors);
      return;
    } else {
      result(null, trySort(results));
    }
  });
}

Orders.getIntransit = result => {
  sql.query(Options.optionsStatus2, (errors, results) => {
    if (errors) {
      console.log("errors: ", errors);
      result(null, errors);
      return;
    } else {
      result(null, trySort(results));
    }
  });
}

Orders.getComplete = result => {
  sql.query(Options.optionsStatus, [4], (errors, results) => {
    if (errors) {
      console.log("errors: ", errors);
      result(null, errors);
      return;
    } else {
      result(null, trySort(results));
    }
  })
}

Orders.getOrder = (orderId, result) => {
  /** initializing our global variable instance */
  const globalOrder = {};
  //getTheOrder
  sql.query(Options.optionsOrder(orderId), (errors, results) => {
    if (errors) {
      console.log("errors: ", errors);
      result(null, errors);
      return;
    } else {
      globalOrder.order = trySort(results);
    }
  })

  //getLocationData
  sql.query(Options.optionsLocation(orderId), (errors, results) => {
    if (errors) {
      console.log("errors: ", errors);
      result(null, errors);
      return;
    } else {
      globalOrder.locations = results
      const returnData = [
        { order: globalOrder.order },
        { locations: globalOrder.locations }
      ];
      result(null, returnData);
    }
  })
}

//get Intransit Order
Orders.getIntransitOrder = (orderId, result) => {
  sql.query(Options.intransitOptions(orderId), (errors, results) => {
    if (errors) {
      console.log("errors: ", errors);
      result(null, errors);
      return;
    } else {
      result(null, trySort(results));
    }
  })
}

Orders.fetchOrder = (orderId, result) => {
  sql.query(Options.fetchOrderOption(orderId), (errors, results) => {
    if (errors) {
      console.log("errors: ", errors);
      result(null, errors);
      return;
    } else {
      result(null, trySort(results));
    }
  })
}

Orders.fetchDispatchedOrder = (orderId, result) => {
  sql.query(Options.fetchDispatchedOrderOptions(orderId), (errors, results) => {
    if (errors) {
      console.log("errors: ", errors);
      result(null, errors);
      return;
    } else {
      result(null, trySort(results));
    }
  })
}

Orders.fetchUnscheduledMoves = result => {
  sql.query(Options.movesOptions1, (errors, results) => {
    if (errors) {
      console.log("errors: ", errors);
      result(null, errors);
      return;
    } else {
      result(null, trySort(results));
    }
  })
}

Orders.fetchScheduledMoves = result => {
  sql.query(Options.movesOptions2, (errors, results) => {
    if (errors) {
      console.log("errors: ", errors);
      result(null, errors);
      return;
    } else {
      result(null, trySort(results))
    }
  })
}

Orders.updateScheduledOrder = (value, result) => {
  console.log(value.dateTime)
  sql.query(Options.updateScheduled, [value.dateTime, value.orderNo], (errors, results) => {
    if (errors) {
      console.log("errors: ", errors);
      result(null, errors);
      return
    } else {
      result(null, results)
    }
  })
}

module.exports = Orders;
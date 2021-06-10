module.exports = app => {
    const orders = require("../controllers/orders.controller.js");
  
    // Retrieve all Customers
    app.get("/orders", orders.findAll);

    app.get("/orders/unassigned", orders.findUnassigned);

    app.get("/orders/intransit", orders.findIntransit);

    app.get("/orders/getCompleteOrders", orders.findComplete);

    app.get("/orders/:orderId", orders.findOrder);

    app.get("/orders/intransitOrder/:orderId", orders.findIntransitOrder);

    app.get("/orders/fetchOrder/:orderId", orders.fetchOrder);

    app.get("/orders/fetchDispatchedOrder/:orderId", orders.fetchDispatchedOrder);

    app.get("/unscheduledMoves", orders.fetchUnscheduledMoves);

    app.get("/scheduledMoves", orders.fetchScheduledMoves);

    app.post("/updateScheduleMove", orders.updateScheduledMove);
  };
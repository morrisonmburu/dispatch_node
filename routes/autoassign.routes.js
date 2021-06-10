module.exports = app => {
    const orders = require("../controllers/autoassign.controller");
  
    // Retrieve all Customers
    app.post("/autoAssign", orders.autoAssign);
  };
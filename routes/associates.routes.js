module.exports = app => {
    const Associates = require('../controllers/associates.controller.js')

    // Retrieve all Customers
    app.get("/associates", Associates.findAll);

    app.get("/associates/online", Associates.findOnline);

    app.get("/associates/offline", Associates.findOffline);

    app.get("/associates/inactive", Associates.findInactive);

    app.get("/associates/:associateId", Associates.findAssociate);

    app.get("/associates/associateType/:associateType", Associates.findAssociateAccount);

    app.get("/associates/fetchRider/:associateId", Associates.fetchDriver);

    app.get("/associatesTasks/:driverNo", Associates.findTasks);
}
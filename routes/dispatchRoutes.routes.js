module.exports = app => {
    const Dispatch = require('../controllers/dispatch.controller.js')

    app.post("/dispatchRoute", Dispatch.dispatch)
}
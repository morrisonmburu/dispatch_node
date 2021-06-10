const sql = require('./db.js');
const optionsAuto = require("../options/autoassign.options")
const autoAssigns = (autoAssignModel) => {}

autoAssigns.fetchRiders = (value, result) => {
    sql.query(optionsAuto.Options1, [value], (errors, results) => {
        if (errors) {
            console.log("errors: ", errors)
            result(null, errors)
            return
        } else {
            result(results)
        }
    })
}

module.exports = autoAssigns
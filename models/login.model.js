const sql = require("./db.js");
const loginOptions = require("../options/login.options.js");
// constructor
const LoginModel = function(LoginModel) {};

LoginModel.login = (email, result) => {
    sql.query(loginOptions.options, [email] ,(errors, results) => {
        if (errors) {
            console.log("errors: ", errors)
            result(null, errors)
            return
        } else {
            result(results)
        }
    })
}

module.exports = LoginModel

module.exports = app => {
    const Login = require('../controllers/login.controller.js')

    app.post('/login', Login.login)
}
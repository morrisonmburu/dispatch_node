const LoginModel = require("../models/login.model")
const bcrypt = require('bcryptjs');

exports.login = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    LoginModel.login(email, (data, err) => {
        if (err) {
            res.status(500).send('Something Went Wrong')
        } else {
            let message = '';
            if (data.length) {
                req.session.userId = data[0].id;
                req.session.user = data[0];
                bcrypt.compare(password, data[0].password, (err, isMatch) => {
                    if (err) {
                        throw err;
                    } else if (!isMatch) {
                        console.log('wrong');
                        message = 'Wrong Credentials. Try Again';
                        res.send({ authorized: false, message });
                    } else {
                        message = 'Your credentials are correct, Welcome to dispatch panel';
                        req.session.auth = true;
                        res.status(200).send({ authorized: true, message: message, data: req.session.user })
                    }
                });
            }
            else {
                message = 'Wrong Credentials. Try Again';
                res.send({ authorized: false, message })
            }
        }
    })
}
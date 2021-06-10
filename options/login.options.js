const loginOptions = () => {}

loginOptions.options = {
    sql: 'SELECT * FROM admins WHERE email = ?'
}

module.exports = loginOptions;
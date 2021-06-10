const optionsAuto = () => {}

optionsAuto.Options1 = {
    sql: 'SELECT * FROM couriers WHERE associate_type = ? AND is_online = 1'
}

module.exports = optionsAuto
const optionsAssociates = () => {}

optionsAssociates.optionsAll = {
    sql: 'SELECT * FROM couriers',
}

optionsAssociates.optionsOnline = {
    sql: 'SELECT * FROM couriers WHERE is_online = ? ORDER BY id DESC',
}

optionsAssociates.optionsOffline = {
    sql: 'SELECT * FROM couriers WHERE is_online = ? AND status = 1 ORDER BY id DESC',
}

optionsAssociates.optionsInacitve = {
    sql: 'SELECT * FROM couriers WHERE status = ? ORDER BY id DESC',
}

optionsAssociates.optionsAssociate = {
    sql: 'SELECT * FROM couriers WHERE id = ?',
}

optionsAssociates.optionsAssociateType = {
    sql: 'SELECT * FROM couriers WHERE associate_type = ? AND is_online = 1 AND on_the_move = 1',
}

optionsAssociates.optionsFetchRider = {
    sql: 'SELECT * FROM couriers WHERE id = ?',
}

optionsAssociates.optionsTasksOptions = {
    sql: 'SELECT * FROM dispatches WHERE driverNo = ? AND created_at BETWEEN date_sub(now(), interval 7 week) AND date_add(now(), interval 0 day)',
}

optionsAssociates.updateCouriersOptions = {
    sql: 'UPDATE couriers SET on_the_move = 1 WHERE id = ?'
}

optionsAssociates.insertDispatchOptions = {
    sql: 'INSERT INTO dispatches SET ?'
}

module.exports = optionsAssociates;

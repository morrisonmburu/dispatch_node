const ordersOptions = () => {}

ordersOptions.optionsAll = {
    sql: 'SELECT orders.*, '
      + ' locations.address, locations.name, locations.latitude, locations.longitude,'
      + ' locations.is_stopover, locations.is_destination, locations.order_id,'
      + ' categories.name as category, truck_types.name as truck_type, order_payments.total,'
      + ' payment_types.name as payment_type, users.username as customerName, orders.created_at as orderMadeAt'
      + ' FROM orders INNER JOIN (locations as locations, categories as categories,'
      + ' truck_types as truck_types, order_payments as order_payments, payment_types as payment_types, users as users)'
      + ' ON (locations.order_id = orders.id AND categories.id = orders.category_id AND truck_types.id = orders.truck_type_id AND'
      + ' order_payments.id = orders.payment_id AND payment_types.id = order_payments.payment_type_id AND orders.user_id = users.id)'
      + ' WHERE locations.is_stopover = 0 ORDER BY orders.id DESC, locations.id ASC',
}

ordersOptions.optionsStatus = {
    sql: 'SELECT orders.*, '
      + ' locations.address, locations.name,locations.latitude, locations.longitude,'
      + ' locations.is_stopover, locations.is_destination, locations.order_id,'
      + ' categories.name as category, truck_types.name as truck_type, order_payments.total,'
      + ' payment_types.name as payment_type, users.username as customerName, orders.created_at as orderMadeAt'
      + ' FROM orders INNER JOIN (locations as locations, categories as categories,'
      + ' truck_types as truck_types, order_payments as order_payments, payment_types as payment_types, users as users)'
      + ' ON (locations.order_id = orders.id AND categories.id = orders.category_id AND truck_types.id = orders.truck_type_id AND'
      + ' order_payments.id = orders.payment_id AND payment_types.id = order_payments.payment_type_id AND orders.user_id = users.id)'
      + ' WHERE locations.is_stopover = 0 AND orders.status = ? ORDER BY orders.id DESC, locations.id ASC',
}

ordersOptions.optionsStatus2 = {
    sql: 'SELECT orders.*, '
      + ' locations.address, locations.name,locations.latitude, locations.longitude,'
      + ' locations.is_stopover, locations.is_destination, locations.order_id,'
      + ' categories.name as category, truck_types.name as truck_type, order_payments.total,'
      + ' payment_types.name as payment_type, users.username as customerName, orders.created_at as orderMadeAt'
      + ' FROM orders INNER JOIN (locations as locations, categories as categories,'
      + ' truck_types as truck_types, order_payments as order_payments, payment_types as payment_types, users as users)'
      + ' ON (locations.order_id = orders.id AND categories.id = orders.category_id AND truck_types.id = orders.truck_type_id AND'
      + ' order_payments.id = orders.payment_id AND payment_types.id = order_payments.payment_type_id AND orders.user_id = users.id)'
      + ' WHERE locations.is_stopover = 0 AND orders.status = 2 ORDER BY orders.id DESC, locations.id ASC',
}

// ALTER TABLE `orders` ADD `is_scheduled` INT NULL DEFAULT '0' AFTER `give_feedback_now`;
// ALTER TABLE `orders` ADD `scheduled_at` TIMESTAMP NULL AFTER `is_scheduled`;

ordersOptions.movesOptions1 = {
    sql: 'SELECT orders.*, '
        + ' locations.address, locations.name, locations.latitude, locations.longitude,'
        + ' locations.is_stopover, locations.is_destination, locations.order_id,'
        + ' categories.name as category, truck_types.name as truck_type, order_payments.total,'
        + ' payment_types.name as payment_type, users.username as customerName, orders.created_at as orderMadeAt'
        + ' FROM orders INNER JOIN (locations as locations, categories as categories,'
        + ' truck_types as truck_types, order_payments as order_payments, payment_types as payment_types, users as users)'
        + ' ON (locations.order_id = orders.id AND categories.id = orders.category_id AND truck_types.id = orders.truck_type_id AND'
        + ' order_payments.id = orders.payment_id AND payment_types.id = order_payments.payment_type_id AND orders.user_id = users.id)'
        + ' WHERE locations.is_stopover = 0 AND orders.category_id = 3 AND orders.status = 0 AND orders.is_scheduled = 0 ORDER BY orders.id DESC, locations.id ASC',
}

ordersOptions.movesOptions2 = {
  sql: 'SELECT orders.*, '
        + ' locations.address, locations.name, locations.latitude, locations.longitude,'
        + ' locations.is_stopover, locations.is_destination, locations.order_id,'
        + ' categories.name as category, truck_types.name as truck_type, order_payments.total,'
        + ' payment_types.name as payment_type, users.username as customerName, orders.created_at as orderMadeAt'
        + ' FROM orders INNER JOIN (locations as locations, categories as categories,'
        + ' truck_types as truck_types, order_payments as order_payments, payment_types as payment_types, users as users)'
        + ' ON (locations.order_id = orders.id AND categories.id = orders.category_id AND truck_types.id = orders.truck_type_id AND'
        + ' order_payments.id = orders.payment_id AND payment_types.id = order_payments.payment_type_id AND orders.user_id = users.id)'
        + ' WHERE locations.is_stopover = 0 AND orders.category_id = 3 AND orders.status = 0 AND orders.is_scheduled = 1 ORDER BY orders.id DESC, locations.id ASC',
}

ordersOptions.optionsOrder = (orderId, result) => {
  const options = {
    sql: `${'SELECT orders.*, '
      + ' locations.address, locations.name, locations.latitude, locations.longitude,'
      + ' locations.is_stopover, locations.is_destination, locations.order_id,'
      + ' categories.name as category, truck_types.name as truck_type, order_payments.total,'
      + ' payment_types.name as payment_type, users.username as customerName, users.phone as customerPhone, orders.created_at as orderMadeAt'
      + ' FROM orders INNER JOIN (locations as locations, categories as categories,'
      + ' truck_types as truck_types, order_payments as order_payments, payment_types as payment_types, users as users)'
      + ' ON (locations.order_id = orders.id AND categories.id = orders.category_id AND truck_types.id = orders.truck_type_id AND'
      + ' order_payments.id = orders.payment_id AND payment_types.id = order_payments.payment_type_id AND orders.user_id = users.id)'
      + ' WHERE orders.id = '}${orderId} AND locations.is_stopover = 0 `,
  };

  return options;
}

ordersOptions.optionsLocation = (orderId, result) => {
  const options = {
    sql: `${'SELECT * FROM locations WHERE order_id = '}${orderId}`,
  }

  return options;
}

ordersOptions.intransitOptions = (orderId, result) => {
  const options = {
    sql: `${'SELECT orders.*, '
      + ' locations.address, locations.name,locations.latitude, locations.longitude,'
      + ' locations.is_stopover, locations.is_destination, locations.order_id,'
      + ' categories.name as category, truck_types.name as truck_type, order_payments.total,'
      + ' payment_types.name as payment_type'
      + ' FROM orders INNER JOIN (locations as locations, categories as categories,'
      + ' truck_types as truck_types, order_payments as order_payments, payment_types as payment_types)'
      + ' ON (locations.order_id = orders.id AND categories.id = orders.category_id AND truck_types.id = orders.truck_type_id AND'
      + ' order_payments.id = orders.payment_id AND payment_types.id = order_payments.payment_type_id)'
      + ' WHERE orders.id = '}${orderId} AND locations.is_stopover = 0 AND orders.status != 0`,
  };

  return options;
}

ordersOptions.fetchOrderOption = (orderId, result) => {
  const options = {
    sql: `${'SELECT orders.*, '
      + ' locations.address, locations.name, locations.latitude, locations.longitude,'
      + ' locations.is_stopover, locations.is_destination, locations.order_id,'
      + ' categories.name as category, truck_types.name as truck_type, order_payments.total,'
      + ' payment_types.name as payment_type, users.username as customerName, users.phone as customerPhone, orders.created_at as orderMadeAt'
      + ' FROM orders INNER JOIN (locations as locations, categories as categories,'
      + ' truck_types as truck_types, order_payments as order_payments, payment_types as payment_types, users as users)'
      + ' ON (locations.order_id = orders.id AND categories.id = orders.category_id AND truck_types.id = orders.truck_type_id AND'
      + ' order_payments.id = orders.payment_id AND payment_types.id = order_payments.payment_type_id AND orders.user_id = users.id)'
      + ' WHERE orders.id = '}${orderId} AND locations.is_stopover = 0 `,
  };

  return options;
}

ordersOptions.updateOrderOptions = {
  sql: 'UPDATE orders SET status = 2 WHERE id = ?'
}

ordersOptions.fetchDispatchedOrderOptions = (orderId, result) => {
  const options = {
    sql: `${'SELECT orders.*, '
      + ' locations.address, locations.name, locations.latitude, locations.longitude,'
      + ' locations.is_stopover, locations.is_destination, locations.order_id,'
      + ' categories.name as category, truck_types.name as truck_type, order_payments.total,'
      + ' payment_types.name as payment_type, users.username as customerName, users.phone as customerPhone, orders.created_at as orderMadeAt, dispatches.DriverName as driverName'
      + ' FROM orders INNER JOIN (locations as locations, categories as categories,'
      + ' truck_types as truck_types, order_payments as order_payments, payment_types as payment_types, users as users, dispatches as dispatches)'
      + ' ON (locations.order_id = orders.id AND categories.id = orders.category_id AND truck_types.id = orders.truck_type_id AND'
      + ' order_payments.id = orders.payment_id AND payment_types.id = order_payments.payment_type_id AND orders.user_id = users.id AND orders.id = dispatches.orderNo)'
      + ' WHERE orders.id = '}${orderId} AND locations.is_stopover = 0 AND orders.status != 0`,
  }; 

  return options;
}

ordersOptions.updateDispatches = {
  sql: 'UPDATE dispatches SET DriverName = ?, DriverPhone = ? WHERE orderNo = ?'
}

ordersOptions.findOrderOptions = {
  sql: 'SELECT * FROM orders WHERE id = ?'
}

ordersOptions.findDispatches = {
  sql: 'SELECT * FROM dispatches WHERE orderNo = ?'
}

ordersOptions.updateScheduled = {
  sql: 'UPDATE orders SET is_scheduled = 1, scheduled_at = ? WHERE ord_no = ?'
}

module.exports = ordersOptions;
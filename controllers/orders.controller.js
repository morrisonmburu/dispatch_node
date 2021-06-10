const Orders = require("../models/orders.model.js");
const Extra = require('../controllers/extraItems.controller.js');

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Orders.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Orders."
        });
        else res.send(data);
    });
};

exports.findUnassigned = (req, res) => {
    Orders.getUnassigned((err, data) => {
        if (err) 
            res.status(500).send({
                message:
                err.message || "Some error has occurred while retrieving Unassigned Orders."
            });

        else res.send(data);
    })
}

exports.findIntransit = (req, res) => {
    Orders.getIntransit((err, data) => {
        if (err) 
            res.status(500).send({
                message:
                err.message || "Some error has occurred while retrieving Intransit Orders."
            });
            
        else res.send(data);
    })
}

exports.findComplete = (req, res) => {
    Orders.getComplete((err, data) => {
        if (err) 
            res.status(500).send({
                message:
                err.message || "Some error has occurred while retrieving Complete Orders."
            });
            
        else res.send(data);
    })
}

exports.findOrder = (req, res) => {
    Orders.getOrder(req.params.orderId, (err, data) => {
        if (err) 
            res.status(500).send({
                message:
                err.message || "Some error has occurred while retrieving order."
            });
            
        else res.send(data);
    }) 
}

exports.findIntransitOrder = (req, res) => {
    Orders.getIntransitOrder(req.params.orderId, (err, data) => {
        if (err) 
            res.status(500).send({
                message:
                err.message || "Some error has occurred while retrieving order."
            });
            
        else res.send(data);
    })
}

exports.fetchOrder = (req, res) => {
    Orders.fetchOrder(req.params.orderId, (err, data) => {
        if (err) 
            res.status(500).send({
                message:
                err.message || "Some error has occurred while retrieving order."
            });
            
        else res.send(data);
    })
}

exports.fetchDispatchedOrder = (req, res) => {
    Orders.fetchDispatchedOrder(req.params.orderId, (err, data) => {
        if (err) 
            res.status(500).send({
                message:
                err.message || "Some error has occurred while retrieving order."
            });
        else res.send(data);
    })
}

exports.fetchUnscheduledMoves = (req, res) => {
    Orders.fetchUnscheduledMoves((err, data) => {
        if (err) 
            res.status(500).send({
                message:
                err.message || "Some error has occurred while retrieving orders."
            });
        else res.send(data);
    })
}

exports.fetchScheduledMoves = (req, res) => {
    Orders.fetchScheduledMoves((err, data) => {
        if (err) 
        res.status(500).send({
            message:
            err.message || "Some error has occurred while retrieving orders."
        });
        
        else res.send(data);  
    })
}

exports.updateScheduledMove = (req, res) => {
    const orderNo = req.body.orderNo
    const date = req.body.date
    const time = req.body.time
    const dateTime = Extra.dateTime(date, time)
    const value = {
        orderNo: orderNo,
        dateTime: dateTime
    }
    Orders.updateScheduledOrder(value, (err, data) => {
        if (err) 
        res.status(500).send({
            message:
            err.message || "Some error has occurred while retrieving orders."
        });
        
        else res.send(data);
    })
}

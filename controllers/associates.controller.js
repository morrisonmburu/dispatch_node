const Associates = require('../models/associates.model.js');

exports.findAll = (req, res) => {
    Associates.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Associates."
        });
        else res.send(data);
    })
}

exports.findOnline = (req, res) => {
    Associates.getOnline((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Online Associates."
        });
        else res.send(data);  
    })
}

exports.findOffline = (req, res) => {
    Associates.getOffline((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Offline Associates."
        });
        else res.send(data);
    })
}

exports.findInactive = (req, res) => {
    Associates.getInactive((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Associates."
        });
        else res.send(data);
    })
}

exports.findAssociate = (req, res) => {
    Associates.getAssociate(req.params.associateId ,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving Associates."
            })
        else res.send(data);
    })
}

exports.findAssociateAccount = (req, res) => {
    Associates.getAssociateAccount(req.params.associateType, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving Associates."
            })
        else res.send(data);
    })
}

exports.fetchDriver = (req, res) => {
    Associates.fetchRider(req.params.associateId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving Associates."
            })
        else res.send(data);
    })
}

exports.findTasks = (req, res) => {
    Associates.getTasks(req.params.driverNo, (err, data) => {
        if (err) 
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving Tasks."
            })
        else res.send(data)
    })
}

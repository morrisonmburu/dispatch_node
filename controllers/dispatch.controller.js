const Dispatch = require('../models/dispatch.model.js')
const Extra = require('../controllers/extraItems.controller.js');

const admin = require('firebase-admin');
const serviceAccount = require('./volant-associate-02ae0fb8d0e4.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://volant-associate.firebaseio.com',
});

exports.dispatch = (req, res) => {
    const result = req.body.data

    if (result.status === 1) {
        Dispatch.dispatchOrder(result, (err, data) => {
            if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while dispatching the order."
            });
            else 
            res.send(data);
            const payload = {
                data: {
                  pickupPoint: result.origin,
                  pickupTime: Extra.formatAMPM(data[3].order[0].pickup_datetime),
                  senderName: data[3].order[0].sender_name,
                  destination: result.destination,
                  recipientName: data[3].order[0].recipient_name,
                  deliveryTime: Extra.formatAMPM(data[3].order[0].pickup_datetime),
                  dispatch_id: data[0].insertDispatch.insertId.toString()
                },
            };
            admin.messaging().sendToDevice(result.registrationToken, payload)
            .then((response) => {
                console.log('Notification sent successfully');
            })
            .catch((error) => {
                console.log(error);
            });
        })   
    } else {
        Dispatch.dispatchOrderReassign(result, (err, data) => {
            if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while dispatching the order."
            });
            else
            res.send(data)
            const payload = {
                data: {
                  pickupPoint: result.origin,
                  pickupTime: Extra.formatAMPM(data[4].order[0].pickup_datetime),
                  senderName: data[4].order[0].sender_name,
                  destination: result.destination,
                  recipientName: data[4].order[0].recipient_name,
                  deliveryTime: Extra.formatAMPM(data[4].order[0].pickup_datetime),
                  dispatch_id: data[3].findDispatches[0].id.toString()
                },
            };
            admin.messaging().sendToDevice(result.registrationToken, payload)
            .then((response) => {
                console.log('Notification sent successfully');
            })
            .catch((error) => {
                console.log(error);
            });
        })
    }
}
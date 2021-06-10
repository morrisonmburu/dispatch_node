const Associates = require('../models/associates.model.js');
const autoAssigns = require('../models/autoassign.model.js');
const mapsApiKey = require('./mapsJson.json').mapsApiKey;

const googleMapsClient = require('@google/maps').createClient({
    key: mapsApiKey,
    Promise,
});


exports.autoAssign = (req, res) => {
    autoAssigns.fetchRiders(req.body.truckType, (data, err) => {
        if (err) {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving Tasks."
            })
        } else {
            const origin = req.body.origin
            getresponse(origin, data).then(response => {
                const numbers = []
                for (let i = 0; i < response.length; i++) {
                    const sendData = { id: response[i].id, distance: response[i].data[0].distance.value }
                    numbers.push(sendData)
                }
                res.send(numbers)
            })
        } 
    })

    async function getresponse(origin, data) {
         const response1 = []
        for (let i = 0; i < data.length; i++) {
            const rider = data[i];
            const riderLoc = { lat: rider.latitude, lng: rider.longitude }
            const request = {origins: [origin], destinations: [riderLoc]};
            const response = await googleMapsClient.distanceMatrix(request).asPromise();
            const distances = { data: response.json.rows[0].elements, id: rider.id }
            response1.push(distances)
        }
        return response1
    }
}

// const autoassignModel = function (autoassign) {};

// const global = {}

// const origin = { lat: '-1.286695', lng: '36.816937' }
// const destination = []

// const request = {origins: [origin], destinations: [riderLoc]};
//     getresponse(request).then(response => {
//     array.push(response[0].distance.value)
// })

// const findMin = (arr, min, i) => arr.length === i ? min :
//     findMin(arr, min = arr[i] < min ? arr[i] : min, ++i)

// const arr = [5, 34, 2, 1, 6, 7, 9, 3];
// const min = findMin(arr, arr[0], 0)
// console.log(min);

// async function getresponse (request) {
//     const response = await googleMapsClient.distanceMatrix(request).asPromise();
//     const distances = response.json.rows[0].elements
//     return distances
// }

// getresponse(request)
// const response = _await googleMapsClient.directions()
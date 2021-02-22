const router = require('express').Router();
const Hospital = require('../model/Hospital');

router.post('/', (req, res) => {
    Hospital.find({})
      .then(async (hospital) => {
        var tempArray = []

        const toRadian = angle => (Math.PI / 180) * angle
        const distance = (a, b) => (Math.PI / 180) * (a - b)
        const RADIUS_OF_EARTH_IN_KM = 6371


        for (var key in hospital) {
          if (hospital.hasOwnProperty(key)) {

            var myLat = req.body.lat;
            var myLongi = req.body.long;
            var arrayLat = hospital[key]['latitude']
            var arrayLongi = hospital[key]['xyz']

            // Via Library
            // const start = {
            //   latitude: myLat,
            //   longitude: myLongi
            // }
            // var end = {  
            //   latitude: arrayLat,
            //   longitude: arrayLongi
            // }
            // Via Library

            var dLat = distance(arrayLat, myLat)
            var dLon = distance(arrayLongi, myLongi)

            var latRad = toRadian(myLat)
            var arrayLatRad = toRadian(arrayLat)


            // Haversine Formula
            var a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(latRad) * Math.cos(arrayLatRad)
            var c = 2 * Math.asin(Math.sqrt(a))
            let finalDistance = RADIUS_OF_EARTH_IN_KM * c
            // Haversine Formula

            hospital[key]['distance'] = finalDistance
            tempArray.push(finalDistance)
            console.log("Distance : ", finalDistance)
            // console.log("Distance Lib : ", haversine(start, end)) // Via Library

          }
        }

        let minVal = Math.min.apply(Math, tempArray)

        for (var key in hospital) {
          if (hospital[key]['distance'] == minVal) {
            console.log("Hospitals : ", hospital[key])
            console.log("Nearest Hospital To Your Location : ", hospital[key]['name'])
            var stringToRender = "Nearest Hospital To Your Location : " + hospital[key]['name']
          }
        }
        //res.render('index.ejs', { hospitalList: hospital, nearest: stringToRender })
        res.status(200).send(stringToRender);
      })
      .catch(error => console.error("GET Error : ", error))
  })


  module.exports = router;
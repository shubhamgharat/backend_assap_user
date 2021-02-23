const router = require('express').Router();
const Hospital = require('../model/Hospital');
const Request = require('../model/Request');
const User = require('../model/User');

router.post('/', (req, res) => {
    Hospital.find({})
      .then(async (hospital) => {
        var tempArray = []

        const toRadian = angle => (Math.PI / 180) * angle
        const distance = (a, b) => (Math.PI / 180) * (a - b)
        const RADIUS_OF_EARTH_IN_KM = 6371

        const userid = req.body.id;
        const userr= await User.findOne({ _id: userid});
        console.log(userr);
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
            var answer= hospital[key]
          }
        }
        console.log(answer);
        //res.render('index.ejs', { hospitalList: hospital, nearest: stringToRender })

        //making new request
        const reque= new Request({
          name: userr.name,
          phoneNo: userr.phoneNo,
          latitude: req.body.lat,
          longitude: req.body.long,
          for_whom: answer._id,
          for_whom_name: answer.name

        });
        console.log(reque);
        try{
          reque.save()
      .then(result => {
          console.log("request created");
          res.status(201).json({
              success: true,
              message: stringToRender
          });
      })
      .catch(err => {
        res.status(200).json({
            success: false,
            message: 'Unable to send request'
        });
      });
      }catch(err){
          
          res.status(200).send(err);
      }
        //res.status(200).send(stringToRender);
      })
      .catch(error => console.error("GET Error : ", error))
  })


  module.exports = router;
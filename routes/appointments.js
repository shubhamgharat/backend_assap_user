const router = require("express").Router();
const Hospital = require("../model/Hospital");
const Appointment = require("../model/Appointment");
const User = require("../model/User");

router.post("/booking", async (req, res) => {
  console.log(req.body)
    const userid = req.body.uid;
    const userr = await User.findOne({ _id: userid });
    //console.log(userr);

    const hospiname = req.body.hname;
    const hospii = await Hospital.findOne({name: hospiname});
    //console.log(hospii);

    

    const appointment = new Appointment({
        name: userr.name,
        phoneNo: userr.phoneNo,
        gender: userr.gender,
        latitude: req.body.lat,
        longitude: req.body.long,
        for_whom: hospii._id,
        for_whom_name: hospiname,
        date_when: req.body.dt,
        time_slot: req.body.ts,
        reason: req.body.reason,
      });
      console.log(appointment);

      //res.send('Success!');
      try {
        appointment
          .save()
          .then((result) => {
            console.log("request created");
            res.status(201).json({
              success: true,
              appointement_info: appointment,
            });
          })
          .catch((err) => {
              console.log(err);
            res.status(200).json({
              success: false,
              message: "Unable to send request here",
            });
          });
      } catch (err) {
        res.status(200).send(err);
      }

});

router.get("/update/:id/:stat", async (req, res) => {


    try {
        await Appointment.updateOne({_id: req.params.id},{stat: req.params.stat})
          .then((result) => {
            console.log("request updated");
            res.status(201).json({
              success: true,
              
            });
          })
          .catch((err) => {
              console.log(err);
            res.status(200).json({
              success: false,
              message: "Unable to update request here",
            });
          });
      } catch (err) {
        res.status(200).send(err);
      }
 // const updated = await Appointment.updateOne({_id: req.body.id},{stat: req.body.stat})
 // console.log(updated);
});

router.get("/getappointments/:id",async(req,res)=>{
  try {
    const data =await Appointment.find({for_whom:req.params.id})
    const count = await Appointment.find({ for_whom: req.params.id }).count();

    console.log(data)
    res.status(200).json({data,success:true,count})
  } catch (error) {
res.status(200).json({  success: false });
  }
})

router.delete('/delete/:id',async(req,res)=>{
  try {
     Appointment.remove({ _id: req.params.id }, (err, request) => {
       if (err) {
         res.json({
           success: false,
           message: "Could not delete request",
         });
       } else
         res.json({
           success: true,
           message: "Request removed",
         });
     });
    
  } catch (error) {
    console.log(error)
  }
})
module.exports = router;
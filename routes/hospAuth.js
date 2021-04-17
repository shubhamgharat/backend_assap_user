const router = require("express").Router();
const Hospital = require("../model/Hospital");
const {
  registerValidationHospital,
  loginValidationHospital,
} = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const Joi = require('@hapi/joi');

// const schema = {
//     name: Joi.string().min(6).required(),
//     email: Joi.string().min(6).required().email(),
//     password: Joi.string().min(6).required()
// }

router.post("/register", async (req, res) => {
  //validating data
  //const{ error } = Joi.validate(req.body,schema);
  const { error } = registerValidationHospital(req.body);
  if (error)
    return res
      .status(200)
      .json({ success: false, error: error.details[0].message });
  console.log(error);
  //CHEcking if email already exists
  const emailExist = await Hospital.findOne({ email: req.body.email });
  if (emailExist)
    return res
      .status(200)
      .json({ success: false, error: "Email already exists" });

  //hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //creating new user
  const hospital = new Hospital({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    type: req.body.type,
    contact: req.body.contact,
    main_doc_name: req.body.main_doc_name,
    latitude: req.body.latitude,
    // longi: req.user.longi,
    xyz: req.body.xyz,
    beds: req.body.beds,
  });
  console.log(hospital);
  try {
    hospital
      .save()
      .then((result) => {
        console.log("user created");
        res.status(201).json({
          success: true,
          message: "User Created",
          result: result,
        });
      })
      .catch((err) => {
        res.status(200).json({
          message: "Unable to create User",
        });
      });
  } catch (err) {
    res.status(200).send(err);
  }
});

router.post("/login", async (req, res) => {
  //validating data
  const { error } = loginValidationHospital(req.body);
  if (error)
    return res
      .status(200)
      .json({ success: false, error: error.details[0].message });

  //checking if email exist
  const user = await Hospital.findOne({ email: req.body.email });
  if (!user)
    return res.status(200).json({ success: false, error: "Email not found" });

  //Password checking
  const vaidPass = await bcrypt.compare(req.body.password, user.password);
  if (!vaidPass)
    return res
      .status(200)
      .json({ success: false, error: "Password incorrect" });

  //res.send('logged in!');
  const hosp = await Hospital.findOne({ email: req.body.email });
  //create and assign a token
  const token = jwt.sign({ _id: user._id }, "AGSDFAjsg");
  res
    .header("auth-token", token)
    .json({ success: true, token: token, user: hosp });
});


router.get("/addbed/:id", async(req, res)=> {
    const hospii= await Hospital.findOne({_id: req.params.id });
    console.log(hospii.beds);
    
    const ans= hospii.beds + 1;
    console.log(ans);
    //res.send(ans);
    try {
      await Hospital.updateOne({_id: req.body.id},
        {beds: ans})
        .then((result) => {
          console.log("hospital incremented");
          res.status(200).json({
            success: true,
            
          });
        })
        .catch((err) => {
            console.log(err);
          res.status(200).json({
            success: false,
            message: "Unable to update hospital here",
          });
        });
    } catch (err) {
      res.status(200).send(err);
    }

});


router.get("/removebed/:id", async(req, res)=> {
  const hospii= await Hospital.findOne({_id: req.params.id });
  console.log(hospii.beds);
  const ans= hospii.beds - 1;
  console.log(ans);
  //res.send(ans);
  try {
    await Hospital.updateOne({_id: req.body.id},
      {beds: ans})
      .then((result) => {
        console.log("hospital decremented");
        res.status(201).json({
          success: true,
          
        });
      })
      .catch((err) => {
          console.log(err);
        res.status(200).json({
          success: false,
          message: "Unable to update hospital here",
        });
      });
  } catch (err) {
    res.status(200).send(err);
  }

});

router.get('/getbeds/:id',async(req,res)=>{
  const hospii= await Hospital.findOne({_id: req.params.id });
  res.status(200).json({
          success: true,
          message: "beds",
          data:hospii.beds
        });
})

module.exports = router;

const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
//const Joi = require('@hapi/joi');

// const schema = {
//     name: Joi.string().min(6).required(),
//     email: Joi.string().min(6).required().email(),
//     password: Joi.string().min(6).required()
// }



router.post('/register', async (req,res) => {

    //validating data
    //const{ error } = Joi.validate(req.body,schema);
    const {error} = registerValidation(req.body);
    if(error) return res.status(200).json({ success: false, error: error.details[0].message});

    //CHEcking if email already exists
    const emailExist = await User.findOne({ email: req.body.email});
    if(emailExist) return res.status(200).json({ success: false, error: "Email already exists"});

    //hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //creating new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        gender: req.body.gender,
        phoneNo: req.body.phoneNo,
        dob: req.body.dob
    });
    console.log(user);
    try{
        user.save()
    .then(result => {
        console.log("user created");
        res.status(201).json({
            message: 'User Created',
            result: result
        });
    })
    .catch(err => {
      res.status(200).json({
          message: 'Unable to create User'
      });
    });
  
    }catch(err){
        
        res.status(200).send(err);
    }
});

router.post('/login', async (req,res) => {
    //validating data
    const {error} = loginValidation(req.body);
    if(error) return res.status(200).json({ success: false, error: error.details[0].message});
    
    //checking if email exist
    const user = await User.findOne({ email: req.body.email});
    if(!user) return res.status(200).json({ success: false, error: "Email not found"});

    //Password checking
    const vaidPass = await bcrypt.compare(req.body.password, user.password);
    if(!vaidPass) return res.status(200).json({ success: false, error: "Password incorrect"});

    //res.send('logged in!');
    const patient = await User.findOne({ email: req.body.email});
    console.log(patient);
    //create and assign a token
    const token = jwt.sign({_id: user._id}, 'AGSDFAjsg');
    res.header('auth-token',token).json({ success: true,
                                         token: token,
                                         user: patient
                                        });
});



module.exports = router;
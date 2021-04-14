const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        gender: Joi.string().min(1).required(),
        phoneNo: Joi.string().min(6).required(),
        dob: Joi.string().min(6).required(),
        history: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema);
    
}

const loginValidation = data => {
    const schema = {
        
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema);
    
}

//for hospital
const registerValidationHospital = data => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        type: Joi.string().min(3).required(),
        contact: Joi.string().min(6).required(),
        main_doc_name: Joi.string().min(6).required(),
        latitude: Joi.string().min(6).required(),
        
        xyz: Joi.string().min(6).required(),
        beds: Joi.number().required()
    };
    return Joi.validate(data, schema);
    
}

const loginValidationHospital = data => {
    const schema = {
        
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema);
    
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.registerValidationHospital = registerValidationHospital;
module.exports.loginValidationHospital = loginValidationHospital;
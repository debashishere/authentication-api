// schemas.js 
const Joi = require('joi')

const schemas = {

    USER: Joi.object().keys({
        userName: Joi.string(),
        email: Joi.string().email({ tlds: false }).required(),
        password: Joi.string().required(),
        confromPassword: Joi.string().required()
    }),
    // define all the other schemas below 

};

module.exports = schemas;
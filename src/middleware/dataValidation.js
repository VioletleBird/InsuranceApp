const Joi = require('joi');

//person data validation
function validatePerson(person) {
    const schema = Joi.object({
        firstName:  Joi.string().min(2),
        lastName:   Joi.string().min(2),
        birthDate:  Joi.date(),
        address:    Joi.array(),
        email:      Joi.string(),
        mobile:     Joi.string(),
        insurances: Joi.array()
    });

    return schema.validate(person);
};

//insurance data validation
function validateInsurance(insurance) {
    const schema = Joi.object({
        insType:    Joi.string().valid(...nameOfInsurance),
        subject:    Joi.string(),
        insValue:   Joi.number(),
        fromDate:   Joi.string(),
        toDate:     Joi.string(),
        risks:      Joi.string(),
        events:     Joi.string(),
        notes:      Joi.string(),
        personId:   Joi.string()
    });

    return schema.validate(insurance);
};

const nameOfInsurance = [
    'pojištění nemovitosti', 
    'pojištění domácnosti',
    'pojištění odpovědnosti',
    'povinné ručení',
    'havarijní pojištění',
    'cestovní pojištění',
    'úrazové pojištění',
    'životní pojištění'
];

module.exports = { 
    validatePerson,
    validateInsurance
};

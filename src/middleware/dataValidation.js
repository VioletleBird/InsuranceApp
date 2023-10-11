const Joi = require('joi');

//person data validation
function validatePerson(person, required = true) {
    const schema = Joi.object({
        name:       Joi.string().min(2),
        lastName:   Joi.string().min(2),
        birthDate:  Joi.number(),
        address:    Joi.array().min(1),
        insurance:  Joi.array()
    });

    return schema.validate(person, { presence: (required) ? 'required' : 'optional' })
};

//insurance data validation
function validateInsurance(insurance, required = true) {
    const schema = Joi.object({
        name:       Joi.string().valid(...nameOfInsurance).max(1),
        subject:    Joi.string(),
        value:      Joi.number()
    });

    return schema.validate(insurance, { presence: (required) ? 'required' : 'optional' });
};

const nameOfInsurance = [
    'pojištění nemovitosti', 
    'pojištění domácnosti',
    'pojištění odpovědnosti',
    'povinné ručení',
    'havarijní pojištění',
    'cestovní pojištění',
    'úrazové pojištění',
    'pojištění odpovědnosti'
];

module.exports = { 
    validatePerson,
    validateInsurance
};

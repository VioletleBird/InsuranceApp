const bcrypt = require('bcrypt');
const Joi = require('joi');

function hashPassword(password, saltRounds = 10) {
    return bcrypt.hashSync(password, saltRounds);
};

function verifyPassword(passwordHash, password) {
    return bcrypt.compareSync(password, passwordHash);
};

function getPublicSessionData(sessionData) {
    const allowedKeys = ["_id", "email", "isAdmin"];
    const entries = allowedKeys
        .map(key => [key, sessionData[key]]);
    return Object.fromEntries(entries);
};

function validateUser(data) {
    const schema = Joi.object({
        email:      Joi.string().email(),
        password:   Joi.string().min(6)
    });

    return schema.validate(data);
};

function validateLogin(data) {
    const schema = Joi.object({
        email:      Joi.string(),
        password:   Joi.string()
    });

    return schema.validate(data);
}

module.exports = { 
    hashPassword,
    verifyPassword,
    getPublicSessionData,
    validateUser,
    validateLogin
};

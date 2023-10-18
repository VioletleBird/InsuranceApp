const mongoose = require('mongoose');

const personSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Zadejte Vaše křestní jméno."],
            ref: 'firstName'
        },
        lastName: {
            type: String,
            required: [true, "Zadejte Vaše příjmení."],
            ref: 'lastName'
        },
        birthDate: {
            type: String,
            required: [true, "Zadejte Vaše datum narození."],
            ref: 'birthDate'
        },
        address: {
            type: [ String ],
            required: false,
            ref: 'address'
        },
        email: {
            type: String,
            required: false,
            ref: 'email'
        },
        phone: {
            type: String,
            required: false,
            ref: 'phone'
        },
        insurances: {
            type: [mongoose.Schema.Types.ObjectId],
            required: false,
            res: 'insurances'
        }
    }
);

module.exports = mongoose.model('Person', personSchema);

const mongoose = require('mongoose');

const personSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Zadejte Vaše křestní jméno."],
        },
        lastName: {
            type: String,
            required: [true, "Zadejte Vaše příjmení."],
        },
        birthDate: {
            type: Number,
            required: [true, "Zadejte Vaše datum narození."],
        },
        address: {
            type: [ String ],
        },
        insurance: [mongoose.Schema.Types.ObjectId],
    }
);

module.exports = mongoose.model('Person', personSchema);
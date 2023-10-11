const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, 'Vyberte pojištění.'],
        },
        subject: {
            type: String,
            require: false,
        },
        value: {
            type: Number,
            required: [true, "Zadejte výši pojištění."]
        },
        person: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Osoba je povinná.'],
        }
    }
);

module.exports = mongoose.model("Insurance", insuranceSchema);

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
        fromDate: {
            type: Date,
        },
        toDate: {
            type: Date,
        },
        risks: {
            type: String,
        },
        events: {
            type: String,
        },
        notes: {
            type: String,
        },
        person: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Osoba je povinná.'],
        }
    }
);

module.exports = mongoose.model("Insurance", insuranceSchema);

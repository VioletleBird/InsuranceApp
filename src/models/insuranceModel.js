const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema(
    {
        insType: {
            type: String,
            required: [true, 'Vyberte pojištění.'],
            ref: 'insType'
        },
        subject: {
            type: String,
            required: false,
            ref: 'subject'
        },
        insValue: {
            type: Number,
            required: [true, "Zadejte výši pojištění."],
            ref: 'insValue'
        },
        fromDate: {
            type: Date,
            required: false,
            ref: 'fromDate'
        },
        toDate: {
            type: Date,
            required: false,
            ref: 'toDate'
        },
        risks: {
            type: String,
            required: false,
            ref: 'risks'
        },
        events: {
            type: String,
            required: false,
            ref: 'events'
        },
        notes: {
            type: String,
            required: false,
            ref: 'notes'
        },
        personId: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'personId'
        }
    }
);

module.exports = mongoose.model("Insurance", insuranceSchema);

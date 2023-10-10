const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema(
    {
        name: {
            type: [String],
            require: [true, "Vyberte pojištění."],
        },
        subject: {
            type: String,
        },
        value: {
            type: Number,
            required: [true, "Zadejte výši pojištění."]
        },
        personId: {
            type: [mongoose.Schema.Types.ObjectId],
            require: [true, "Nelze založit pojištění bez pojištěné osoby."]
        },
    }
);

module.exports = mongoose.model("Insurance", insuranceSchema);

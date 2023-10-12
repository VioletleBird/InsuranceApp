const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Zadejte Váš email."],
            unique: [true, "Tento email je již používán."],
        },
        passwordHash: {
            type: String,
            required: [true, "Zadejte heslo."],
        },
        isAdmin: {
            type: Boolean,
        },
    },
);

module.exports = mongoose.model("User", userSchema);

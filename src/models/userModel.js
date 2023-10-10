const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Zadejte přihlašovací jméno."],
        },
        email: {
            type: String,
            required: [true, "Zadejte Váš email."],
            unique: [true, "Tento email je již používán."],
        },
        password: {
            type: String,
            required: [true, "Zadejte heslo."],
        },
        isAdmin: {
            type: Boolean,
        },
    },
);

module.exports = mongoose.model("User", userSchema);

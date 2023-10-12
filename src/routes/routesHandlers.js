
const User = require('../models/userModel.js');

//if user is login
const requireAuthHandler = (req, res, next) => {
    const user = req.session.user;
    if (!user) {
        res.status(401).send('Nejprve se přihlaste.');
        return;
    }
    User.findById(user._id)
        .then((user) => {
            if (user === null) {
                req.session.destroy((error) => {
                    if (error) {
                        res.status(500).send('Nastala chyba při autentizaci.');
                        return;
                    }
                    res.status(401).send('Nejprve se přihlaste.');
                });
                return;
            }
            next();
        })
        .catch(() => {
            res.status(500).send('Nastala chyba při autentizaci.')
        });
};

//if user is admin
const requireAdminHandlers = [
    requireAuthHandler,
    (req, res, next) => {
        const user = req.session.user;
        if (!user.isAdmin) {
            res.status(403).send("Nemáte dostatečná oprávnění.");
            return;
        }
        next();
    }
];

module.exports = {
    requireAuthHandler,
    requireAdminHandlers
};

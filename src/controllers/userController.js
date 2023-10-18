const User = require('../models/userModel.js');
const { 
    hashPassword,
    verifyPassword,
    getPublicSessionData, 
    validateUser, 
    validateLogin 
} = require('../middleware/userValidation.js');

const getUser = async (req, res) => {
    res.send(getPublicSessionData(req.session.user));
};

//register new user
const newUser = async (req, res) => {
    const userData = req.body;
    const { error } = validateUser(userData);
    if (error) {
        res.status(400).send('Neplatné údaje.');
        return;
    }
    const userCreateData = {
        email: userData.email,
        passwordHash: hashPassword(userData.password),
        isAdmin: false
    };
    await User.create(userCreateData)
        .then(savedUser => {
            const result = savedUser.toObject();
            delete result.passwordHash;
            res.render('index');
        })
        .catch(error => {
            if (error.code === 11000) { //11000 = error duplicateKey
                res.status(400).send('Účet se zadaným emailem již existuje.');
                return;
            }
            res.status(500).send('Nastala chyba při registraci.');
        });
};

//login user
const loginUser = (req, res) => {
    const loginData = req.body;
    const { error } = validateLogin(loginData);
    if (error) {
        res.status(400).send('Neplatné údaje.');
        return;
    }

    User.findOne({email: loginData.email})
        .then(user => {
            if (!user || !verifyPassword(user.passwordHash, loginData.password)) {
                res.status(400).send('Email nebo heslo nenalezeno.');
                return;
            }
            const sessionUser = user.toObject();
            delete sessionUser.passwordHash;
            req.session.user = sessionUser;

            req.session.save((err) => {
                if (err) {
                    res.status(500).send('Nastala chyba při přihlašování');
                    return;
                }
            });
            res.render('index');
        })
        .catch(() => res.status(500).send('Nastala chyba při hledání uživatele'));
};

//logout user
const logoutUser = async (req, res) => {
    console.log('inner test 1')
    req.session.destroy((error) => {
        if (error) {
            res.status(500).send('Nastala chyba při mazání session.');
            return;
        };
        res.render('index');
    });
};


module.exports = {
    getUser,
    newUser,
    getLoginForm,
    loginUser,
    logoutUser
};

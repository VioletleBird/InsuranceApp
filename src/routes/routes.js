const express = require('express');
const path = require('path');
const router = express.Router();

const {
    getAllPersons,
    getPerson,
    newPerson,
    editPerson,
    deletePerson
} = require('../controllers/personController.js');

const {
    getAllInsurance,
    getInsurance,
    newInsurance,
    editInsurance,
    deleteInsurance
} = require('../controllers/insuranceController.js');

const {
    newUser,
    getUser,
    loginUser,
    logoutUser
} = require('../controllers/userController.js')

const { 
    requireAuthHandler,
    requireAdminHandlers
} = require('./routesHandlers.js');

router.route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, 'src/public/index.html'))
    });

router.route('/pojistenci')
    .get(getAllPersons)
    .post(...requireAdminHandlers, newPerson);

router.route('/pojistenci/:id')
    .get(getPerson)
    .put(...requireAdminHandlers, editPerson)
    .delete(...requireAdminHandlers, deletePerson)
    .post(...requireAdminHandlers, newInsurance);

router.route('/pojisteni')
    .get(getAllInsurance)

router.route('/pojisteni/:id')
    .get(getInsurance)
    .put(...requireAdminHandlers, editInsurance)
    .delete(...requireAdminHandlers, deleteInsurance);

router.route('/user')
    .get(requireAuthHandler, getUser)
    .post(newUser);

router.route('/login')
    .post(loginUser)
    .delete(logoutUser);

module.exports = router;

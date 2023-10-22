const express = require('express');
const router = express.Router();

const {
    getAllPersons,
    getPerson,
    newPerson,
    editPersonForm,
    editPerson,
    deletePerson
} = require('../controllers/personController.js');

const {
    getAllInsurance,
    getInsurance,
    getInsuranceForm,
    newInsurance,
    editInsuranceForm,
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
    .get((req, res) => { res.render('index') });

router.route('/pojistenci')
    .get(requireAuthHandler, getAllPersons)

router.route('/pojistenci/novy')
    .get(requireAuthHandler, (req, res) => { res.render('personForm')})
    .post(...requireAdminHandlers, newPerson);

router.route('/pojistenci/:id')
    .get(requireAuthHandler, getPerson)
    .delete(...requireAdminHandlers, deletePerson);

router.route('/pojisteni')
    .get(requireAuthHandler, getAllInsurance);

router.route('/pojistenci/:id/nove-pojisteni')
    .get(...requireAdminHandlers, getInsuranceForm)
    .post(...requireAdminHandlers, newInsurance);

router.route('/pojistenci/:id/edit')
    .get(...requireAdminHandlers, editPersonForm)
    .put(...requireAdminHandlers, editPerson);

router.route('/pojisteni/:id')
    .get(requireAuthHandler, getInsurance)
    .delete(...requireAdminHandlers, deleteInsurance);

router.route('/pojisteni/:id/edit')
    .get(editInsuranceForm)
    .put(...requireAdminHandlers, editInsurance);

router.route('/user')
    .get(requireAuthHandler, getUser)

router.route('/register')
    .get((req, res) => { res.render('registration') })
    .post(newUser);

router.route('/login')
    .get((req, res) => { res.render('login') })
    .post(loginUser);

router.route('/logout')
    .delete(logoutUser);

module.exports = router;

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
    .get(getAllPersons)

router.route('/pojistenci/novy')
    .get((req, res) => { res.render('personForm')})
    .post(newPerson);
    //...requireAdminHandlers

router.route('/pojistenci/:id')
    .get(getPerson)
    .delete(deletePerson);

router.route('/pojisteni')
    .get(getAllInsurance);

router.route('/pojistenci/:id/nove-pojisteni')
    .get(getInsuranceForm)
    .post(newInsurance);

router.route('/pojistenci/:id/edit')
    .get(editPersonForm)
    .put(editPerson);

router.route('/pojisteni/:id')
    .get(getInsurance)
    .delete(deleteInsurance);

router.route('/pojisteni/:id/edit')
    .get(editInsuranceForm)
    .put(editInsurance);

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

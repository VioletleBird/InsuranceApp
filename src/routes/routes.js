const express = require('express');
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

router.route('/pojistenci')
    .get(getAllPersons)
    .post(newPerson);

router.route('/pojistenci/:id')
    .get(getPerson)
    .put(editPerson)
    .delete(deletePerson);

router.route('/pojisteni')
    .get(getAllInsurance)
    .post(newInsurance);

router.route('/pojisteni/:id')
    .get(getInsurance)
    .put(editInsurance)
    .delete(deleteInsurance);

module.exports = router;

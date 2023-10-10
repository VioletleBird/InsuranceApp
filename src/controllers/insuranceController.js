const Insurance = require('../models/insuranceModel');
const Person = require('../models/personModel');
const validate = require('../middleware/dataValidation');

//get all insurance
const getAllInsurance = async (req, res) => {
    await Insurance.find()
        .then(insurances => { res.json(insurances) })
        .catch(error => { res.send('Pojištění se nepodařilo načíst.') });
};

//get insurence by ID
const getInsurance = async (req, res) => {
    await Insurance.findById(req.params._id)
        .then(result => { res.json(result) })
        .catch(error => { res.send('Pojištění nenalezeno.') });
};

//make new insurance
const newInsurance = async (req, res) => {
    const { error } = validate.validateInsurance(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
    }
    else {
        await Insurance.create(req.body)
            .then(result => { res.json(result) })
            .catch(error => { res.send('Nepodařilo se uložit pojištění.') });
    }
};

//edit insurance
const editInsurance = async (req, res) => {
    const { error } = validate.validateInsurance(req.body, false);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    else {
        await Person.findByIdAndUpdate(req.params._id, req.body, { new: true })
            .then(result => { res.json(result) })
            .catch(error => { res.send("Pojištění se nepodařilo uložit.") });
    }
};

//delete insurance
const deleteInsurance = (req, res) => {
    Insurance.findByIdAndDelete(req.params._id)
        .then(result => {
            if (result) {
                res.json(result)
            }
            else {
                res.status(404).send('Pojištění nenalezeno.')
            }
        })
        .catch(error => { res.status(400).send('Chyba při mazání pojištění.') });
};

module.exports = {
    getAllInsurance,
    getInsurance,
    newInsurance,
    editInsurance,
    deleteInsurance,
};

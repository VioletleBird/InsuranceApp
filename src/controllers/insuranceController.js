const Insurance = require('../models/insuranceModel');
const Person = require('../models/personModel');
const validate = require('../middleware/dataValidation');

//get all insurance
const getAllInsurance = async (req, res) => {
    await Insurance.find()
        .then(insurances => { res.json(insurances) })
        .catch(error => { res.send('Pojištění se nepodařilo načíst.') });
};

//get insurance by ID
const getInsurance = async (req, res) => {
    await Insurance.findById(req.params.id)
        .then(result => { res.json(result) })
        .catch(error => { res.send('Pojištění nenalezeno.') });
};

//make new insurance
const newInsurance = async (req, res) => {
    const { id } = req.params;
    const { name, subject, value } = req.body;

    try {
        const person = await Person.findById(id);
        if (!person) { return res.send('Pojištěnec nenalezen.') };

        const newInsurance = await Insurance.create({ name, subject, value, person: id });

        const { error } = validate.validateInsurance(req.body);
        if (error) {
            res.send('Neplatné údaje.');
            return;
        };

        person.insurance.push(newInsurance.id);
        await person.save();

        res.json(newInsurance);
    }
    catch (error) {
        console.error(error);
        res.send(error);
    }
};

//edit insurance
const editInsurance = async (req, res) => {
    const { error } = validate.validateInsurance(req.body, false);
    if (error) {
        res.send('Neplatné údaje.');
        return;
    }
    else {
        await Insurance.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(result => { res.json(result) })
            .catch(error => { res.send("Pojištění se nepodařilo uložit.") });
    }   
};

//delete insurance
const deleteInsurance = (req, res) => {
    Insurance.findByIdAndDelete(req.params.id)
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

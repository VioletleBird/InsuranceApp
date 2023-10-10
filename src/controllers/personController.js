const Person = require('../models/personModel');
const Insurance = require('../models/insuranceModel');
const validate = require('../middleware/dataValidation');

//get all persons
const getAllPersons = async (req, res) => {
    await Person.find()
        .then(persons => { res.json(persons) })
        .catch(error => { res.send('Pojištěnce se nepodařilo načíst.') });
};

//get person by ID
const getPerson = async (req, res) => {
    await Person.findById(req.params.id)
        .then(result => { res.json(result) })
        .catch(error => { res.send('Osoba nenalezena.') });
};

//make new person
const newPerson = async (req, res) => {
    const { error } = validate.validatePerson(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
    }
    else {
        await Person.create(req.body)
            .then(result => { res.json(result) })
            .catch(error => { res.send('Nepodařilo se uložit osobu.') });
    }
};

//edit person
const editPerson = async (req, res) => {
    const { error } = validate.validatePerson(req.body, false);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    else {
        await Person.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(result => { res.json(result) })
            .catch(error => { res.send("Osobu se nepodařilo uložit.") });
    }
};

//delete person
const deletePerson = (req, res) => {
    Insurance.find({ people: req.params.id }).countDocuments()
        .then(count => {
            if (count != 0) {
                res.status(400).send("Nelze smazat osobu, která má platné pojištění.")
            }
            else {
                Person.findByIdAndDelete(req.params.id)
                    .then(result => { res.json(result) })
                    .catch(error => { res.send('Osobu se nepodařilo smazat.') });
            }
        })
        .catch(error => { res.status(400).send('Osobu se nepodařilo smazat.') });
};

module.exports = { 
    getAllPersons,
    newPerson,
    getPerson,
    editPerson,
    deletePerson
};

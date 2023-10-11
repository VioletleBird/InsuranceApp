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
    await getById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            }
            else { 
                res.status(404).send('Osoba nenalezena.')
            }
        })
        .catch(error => { res.status(400).res.send('Chyba požadavku GET.') });
};

//make new person
const newPerson = async (req, res) => {
    const { error } = validate.validatePerson(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return
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
        res.status(400).send('Neplatné údaje.');
        return
    }
    else {
        await Person.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(result => { res.json(result) })
            .catch(error => { res.send("Osobu se nepodařilo uložit.") });
    }
};

//delete person
const deletePerson = async (req, res) => {
    const { id } = req.params;

    try {
        const person = await Person.findById(id);
        if (!person) { return res.send('Pojištěnec nenalezen') };

        const insuranceIds = person.insurance;

        await person.deleteOne({ _id: person.id });
        await Insurance.deleteMany({ _id: { $in: insuranceIds } });

        res.send('Pojištěnec smazán.')
    }
    catch (error) {
        res.status(500).send('Internal error.')
    };
};

async function getById(id) {
    let person = await Person.findById(id);
    if (person) {
        person = person.toJSON();
        let insurances = await Person.find().where("_id").in(person.insurance).select("_id name");
        person.insurance = JSON.parse(JSON.stringify(insurances));
    }
    return person;
}

module.exports = { 
    getAllPersons,
    newPerson,
    getPerson,
    editPerson,
    deletePerson
};

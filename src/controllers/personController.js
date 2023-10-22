const Person = require('../models/personModel');
const Insurance = require('../models/insuranceModel');
const validate = require('../middleware/dataValidation');

//get all persons
const getAllPersons = (req, res) => {
    Person.find()
        .then(data => { 
            res.render('personsList', { person: data });
        })
        .catch(error => { res.send('Pojištěnce se nepodařilo načíst.') });
};

//get person by ID
const getPerson = async (req, res) => {
    try {
        const person = await getById(req.params.id);
        if (person) {
            res.render('personCard', { person })
        } else { 
            res.send('Pojištěnec nenalezen.')
        }
    } catch (error) {
        res.send('Chyba požadavku GET.')
    };
};

//make new person
const newPerson = (req, res) => {
    const { error } = validate.validatePerson(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
        Person.create(req.body)
            .then(result => {
                res.json(result);
            })
            .catch(error => {
                res.status(500).send('Chyba při ukládání pojištěnce.');
            });
    }
};

//edit form for person
const editPersonForm = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await getById(id);
        res.render('personEditForm', { person: data })
    } catch (error) {
        res.status(500).send('Chyba při úpravě pojištěnce.')
    }
};

//edit person
const editPerson = (req, res) => {
    const { id } = req.params;
    const { error } = validate.validatePerson(req.body);
    if (error) {
        return res.status(400).send('Neplatné údaje.');
    }
    else {    
        Person.findByIdAndUpdate(id, req.body, { new: true })
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                res.send("Osobu se nepodařilo uložit.")
            });
    }
};

//delete person
const deletePerson = async (req, res) => {
    const { id } = req.params;
    try {
        const person = await Person.findById(id);
        if(!person) {
            return res.status(404).send('Pojištěnec nenalezen')        
        }

        const insuranceIds = person.insurances;

        await  Promise.all([
            person.deleteOne(),
            Insurance.deleteMany({ _id: { $in: insuranceIds } })
        ]);
        res.json(person);
    } catch (error) {
        res.status(500).send('Chyba při mazání pojištěnce.')
    }
};

async function getById(id) {
    try {
        let person = await Person.findById(id);
        if (person) {
            person = person.toJSON();
            let insurances = await Insurance.find().where("_id").in(person.insurances).select("_id insType insValue subject");
            person.insurances = JSON.parse(JSON.stringify(insurances));
        }
        return person; 
    } catch (error) {
        throw error;
    }
};

module.exports = { 
    getAllPersons,
    newPerson,
    getPerson,
    editPersonForm,
    editPerson,
    deletePerson
};

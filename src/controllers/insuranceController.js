const Insurance = require('../models/insuranceModel');
const Person = require('../models/personModel');
const validate = require('../middleware/dataValidation');

//get all insurance
const getAllInsurance = async (req, res) => {
    await Insurance.find()
        .then(data => {
            res.render('insuranceList', { insurance: data })
        })
        .catch(error => { res.send('Pojištění se nepodařilo načíst.') });
};

//get insurance by ID
const getInsurance = async (req, res) => {
    try {
        const insurance = await getById(req.params.id);
        if (insurance) {
            res.render('insuranceCard', { insurance: insurance })
        } else { 
            res.status(404).send('Pojištění nenalezeno.')
        }
    } catch (error) {
        res.status(400).send('Chyba požadavku GET.')
    };
};

//make new insurance
const newInsurance = async (req, res) => {
    const { id } = req.params;
    const { insType, subject, insValue, fromDate, toDate, risks, notes } = req.body;

    try {
        const person = await Person.findById(id);
        if (!person) { return res.send('Pojištěnec nenalezen.') };

        const newInsurance = await Insurance.create({ 
            insType, subject, insValue, fromDate, toDate, risks, notes, personId: id 
        });

        const { error } = validate.validateInsurance(req.body);
        if (error) {
            res.send('Neplatné údaje.');
            return;
        };

        person.insurances.push(newInsurance._id);
        await person.save();

        res.render('insuranceCard', { insurance: newInsurance });
    } catch (error) {
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
const deleteInsurance = async (req, res) => {
    const { id } = req.params;
    try {
        await Insurance.findByIdAndDelete(id);
        if (!res.ok) {
            res.status(404).send('Pojištění se nepodařilo smazat.')
        } else {
            const insurances = await Insurance.find();
            res.render('insuranceList', { insurance: insurances });
        }
    } catch (error) {
        res.status(400).send('Chyba na straně serveru.')
    }
};

async function getById(id) {
    try {
        let insurance = await Insurance.findById(id);
        if (insurance) {
            insurance = insurance.toJSON();
            let foundPerson = await Person.find().where("_id").in(insurance.personId).select("_id firstName lastName birthDate");
            insurance.personId = JSON.parse(JSON.stringify(foundPerson));
        }
        return insurance; 
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllInsurance,
    getInsurance,
    newInsurance,
    editInsurance,
    deleteInsurance,
};

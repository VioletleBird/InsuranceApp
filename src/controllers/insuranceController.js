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

const getInsuranceForm = async (req, res) => {
    const { id } = req.params.id;
    res.render('insuranceForm', { id })
};

//make new insurance
const newInsurance = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    console.log(id);
    const { insType, subject, insValue, fromDate, toDate, risks, notes } = req.body;

    try {
        const person = await Person.findById(id);
        if (!person) { 
            return res.status(404).send('Pojištěnec nenalezen.'); 
        }
        console.log(person);

        const { error } = validate.validateInsurance(req.body);
        if (error) {
            return res.status(400).send('Neplatné údaje.');
        };

        const newInsurance = await Insurance.create({ 
            insType, subject, insValue, fromDate, toDate, risks, notes, personId: id 
        });
        console.log(newInsurance);
        person.insurances.push(newInsurance._id);
        await person.save();
        
        res.json(newInsurance);
    } catch (error) {
        res.status(500).send(error);
        console.error(error);
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
        const insurance = await Insurance.findById(id);
        if (!insurance) {
            return res.status(404).send('Pojištění nenalezeno') 
        };   
        await insurance.deleteOne({ _id: insurance.id });

        const insurances = await Insurance.find();
        res.render('insuranceList', { insurance: insurances });
    } 
    catch (error) {
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
    getInsuranceForm,
    newInsurance,
    editInsurance,
    deleteInsurance,
};

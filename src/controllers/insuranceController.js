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

//insurance form
const getInsuranceForm = (req, res) => {
    const { id } = req.params;
    res.render('insuranceForm', { id })
};

//make new insurance
const newInsurance = async (req, res) => {
    const { id } = req.params;
    const { insType, subject, insValue, fromDate, toDate, risks, notes } = req.body;

    try {
        const { error } = validate.validateInsurance(req.body);
        if (error) {
            return res.status(400).send('Neplatné údaje.');
        }

        const person = await Person.findById(id);
        if (!person) { 
            return res.status(404).send('Pojištěnec nenalezen.'); 
        }

        const newInsurance = await Insurance.create({ 
            insType, subject, insValue, fromDate, toDate, risks, notes, personId: id 
        });
        person.insurances.push(newInsurance._id);
        await person.save();

        res.json(newInsurance);
    } catch (error) {
        res.status(500).send('Chyba při ukládání pojištění.');
    }
};

//edit form for insurance
const editInsuranceForm = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await getById(id);
        res.render('insuranceEditForm', { insurance: data })
    } catch (error) {
        res.status(500).send('Chyba při úpravě pojištěnce.')
    }
};

//edit insurance
const editInsurance = (req, res) => {
    const { id } = req.params;
    const { error } = validate.validateInsurance(req.body);
    if (error) {
        return res.status(400).send('Neplatné údaje.');
    }
    else {    
        Insurance.findByIdAndUpdate(id, req.body, { new: true })
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                res.send("Osobu se nepodařilo uložit.")
            });
    }
};

//delete insurance
const deleteInsurance = async (req, res) => {
    const { id } = req.params;
    await Insurance.findById(id)
        .then(ins => {
            if (!ins) {
                return res.status(404).send('Pojištění nenalezeno')  
            } else {
                ins.deleteOne({ _id: ins.id });
                res.json(ins)
            }
        })
        .catch(error => {
            res.status(400).send('Chyba na straně serveru.')
        })
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
    editInsuranceForm,
    editInsurance,
    deleteInsurance,
};

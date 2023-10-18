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
    .post(...requireAdminHandlers, newPerson);

router.route('/pojistenci/:id')
    .get(getPerson)
    .put(...requireAdminHandlers, editPerson)
    .delete(...requireAdminHandlers, deletePerson)

router.route('/pojisteni')
    .get(getAllInsurance);

router.route('/pojistenci/:id/nove-pojisteni')
    .get((req, res) => { res.render('personForm') })
    .post(...requireAdminHandlers, newInsurance);

router.route('/pojisteni/:id')
    .get(getInsurance)
    .put(...requireAdminHandlers, editInsurance)
    .delete(...requireAdminHandlers, deleteInsurance);

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

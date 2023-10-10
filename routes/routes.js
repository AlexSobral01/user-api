var express = require("express");
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
const Usercontroller = require("../controllers/UserController");
const AdminAuth = require('../middleware/AdminAuth');

router.get('/', HomeController.index);

router.post('/user', Usercontroller.create);
router.get('/user', AdminAuth, Usercontroller.index);
router.get('/user/:id', AdminAuth, Usercontroller.findUser);
router.put('/user', AdminAuth, Usercontroller.edit);
router.delete('/user/:id', AdminAuth, Usercontroller.remove);
router.post('/recoverpassword', Usercontroller.recoverPassword);
router.post('/changepassword', Usercontroller.changePassword);
router.post('/login', Usercontroller.login);
router.post('/validate', AdminAuth, HomeController.validate);

module.exports = router;
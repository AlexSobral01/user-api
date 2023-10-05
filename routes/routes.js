var express = require("express");
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
const Usercontroller = require("../controllers/userController");

router.get('/', HomeController.index);

router.post('/user', Usercontroller.create);
router.get('/user', Usercontroller.index);
router.get('/user/:id', Usercontroller.findUser);
router.put('/user', Usercontroller.edit);
router.delete('/user/:id', Usercontroller.remove);
router.post('/recoverpassword', Usercontroller.recoverPassword);

module.exports = router;
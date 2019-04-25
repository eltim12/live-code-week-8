const router = require("express").Router();
const userController = require("../controllers/userController");
const apodController = require("../controllers/apodController")
const { authenticate, authorization } = require('../middlewares/verify')

//register new user
router.post("/register", userController.create);

router.post('/verify', userController.verify)

//login a user
router.post("/login", userController.login);

//list apods
router.get("/apods", apodController.apodList)

//get one apod
router.get("/apods/:id", apodController.find)

//get one apod
router.put("/apods/:id", apodController.update)

//get one apod
router.delete("/apods/:id", apodController.delete)

//create apod
router.post("/apods", authenticate, apodController.create)


module.exports = router;
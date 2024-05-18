const Router = require('express')
const {
    getUsers,
    registerUser,
    login
} = require("../controllers/auth");

const router = new Router()
const {check} = require("express-validator")


router.get('/users', getUsers)
router.post('/register',
//     [check(
//     "name", "Name can not be empty"
// ).notEmpty()],
    registerUser);
router.post('/login', login);


module.exports = router
const Router = require('express')
const {
    getUsers,
    registerUser,
    login,getCollections,createCollection
} = require("../controllers/auth");

const router = new Router()
const {check} = require("express-validator")
const authMiddleware = require('../authMiddleware/authMiddleWare')

router.get('/users',getUsers)
router.get('/collections',getCollections)
router.post('/collections', authMiddleware,createCollection)

router.post('/register',
//     [check(
//     "name", "Name can not be empty"
// ).notEmpty()],
    registerUser);
router.post('/login', login);


module.exports = router
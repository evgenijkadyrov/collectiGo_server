const Router = require('express')
const {
    getUsers,
    registerUser,
    login
} = require("../controllers/auth");
const {
   getCollections,createCollection,deleteCollection
} = require("../controllers/collections");

const router = new Router()
const {check} = require("express-validator")
const authMiddleware = require('../authMiddleware/authMiddleWare')

router.get('/users',getUsers)
router.get('/collections',getCollections)
router.post('/collections', authMiddleware,createCollection)
router.delete('/collections/:id', authMiddleware,deleteCollection)

router.post('/register',
//     [check(
//     "name", "Name can not be empty"
// ).notEmpty()],
    registerUser);
router.post('/login', login);


module.exports = router
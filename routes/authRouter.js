const Router = require('express')
const {
    getUsers,
    registerUser,
    login
} = require("../controllers/auth");
const {
   getCollections,createCollection,deleteCollection, updateCollection
} = require("../controllers/collections");

const router = new Router()
const {check} = require("express-validator")
const authMiddleware = require('../authMiddleware/authMiddleWare')
const {createItem, getItems} = require("../controllers/items");

router.get('/users',getUsers)
router.get('/collections',getCollections)
router.post('/collections', authMiddleware,createCollection)
router.delete('/collections/:id', authMiddleware,deleteCollection)
router.put('/collections/:id', authMiddleware,updateCollection)
router.post('/collections/:id',authMiddleware, createItem)
router.get('/collections/:id', getItems)
router.post('/register',
//     [check(
//     "name", "Name can not be empty"
// ).notEmpty()],
    registerUser);
router.post('/login', login);


module.exports = router
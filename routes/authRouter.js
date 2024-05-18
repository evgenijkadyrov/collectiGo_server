const Router = require('express')
const {
    getUsers,
    registerUser,
    login
} = require("../controllers/auth");
const {
    getCollections, createCollection, deleteCollection, updateCollection
} = require("../controllers/collections");
const {createItem, getItems, deleteItem, updateItem} = require("../controllers/items");

const router = new Router()
const {check} = require("express-validator")
const authMiddleware = require('../authMiddleware/authMiddleWare')


router.get('/users', getUsers)
router.get('/collections', getCollections)
router.post('/collections', authMiddleware, createCollection)
router.delete('/collections/:id', authMiddleware, deleteCollection)
router.put('/collections/:id', authMiddleware, updateCollection)
router.post('/collections/:id', authMiddleware, createItem)
router.get('/collections/:id', getItems)
router.delete('/items/:id', authMiddleware, deleteItem)
router.put('/items/:id', authMiddleware, updateItem)
router.post('/register',
//     [check(
//     "name", "Name can not be empty"
// ).notEmpty()],
    registerUser);
router.post('/login', login);


module.exports = router
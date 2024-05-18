const Router = require('express')

const {createItem, fetchItems, deleteItem, updateItem} = require("../controllers/items");

const router = new Router()
const authMiddleware = require('../authMiddleware/authMiddleWare')


router.post('/:id', authMiddleware, createItem)
router.get('/:id', fetchItems)
router.delete('/:id', authMiddleware, deleteItem)
router.put('/:id', authMiddleware, updateItem)


module.exports = router
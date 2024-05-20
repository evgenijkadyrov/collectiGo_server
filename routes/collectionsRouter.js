const Router = require('express')
const {
    getCollections, createCollection, deleteCollection, updateCollection
} = require("../controllers/collections");

const router = new Router()
const authMiddleware = require('../authMiddleware/authMiddleWare')


router.get('/', getCollections)
router.post('/', authMiddleware, createCollection)
router.delete('/:id', authMiddleware, deleteCollection)
router.put('/:id', authMiddleware, updateCollection)


module.exports = router
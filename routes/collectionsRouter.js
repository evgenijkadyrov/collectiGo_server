const Router = require('express')
const {
    getCollections, createCollection, deleteCollection, updateCollection
} = require("../controllers/collections");

const router = new Router()
const authMiddleware = require('../authMiddleware/authMiddleWare')


router.get('/collections', getCollections)
router.post('/collections', authMiddleware, createCollection)
router.delete('/collections/:id', authMiddleware, deleteCollection)
router.put('/collections/:id', authMiddleware, updateCollection)


module.exports = router
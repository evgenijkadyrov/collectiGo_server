const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('../routes/authRouter')
const itemsRouter = require('../routes/itemsRouter')
const collectionsRouter = require('../routes/collectionsRouter')

const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000
const cors = require('cors');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/auth', authRouter)
app.use('/items', itemsRouter)
app.use('/collections', collectionsRouter)


const start = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSEURI)
        app.listen(port, () => {
            console.log(`App listen on ${port} port`)
        })
    } catch (e) {
        console.log(e)
    }
}
start()
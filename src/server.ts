import express from 'express'
import mongoose from 'mongoose'
const cors = require('cors')
const cloudinary = require('cloudinary').v2
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');
const countriesRouter = require('./routes/countries')
const userRouter = require('./routes/user')
const loginRouter = require('./routes/login')
const logAuth = require('./middleware/logAuth')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri: any = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})

app.use('/login', loginRouter)
app.use('/user', userRouter)
app.use('/countries', logAuth, countriesRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const productRouter = require('./routes/productRouter')
const authRouter = require('./routes/authRouter')
const { ensureAuth } = require('./middleware/auth')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/tracker', ensureAuth, productRouter)

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port: ${process.env.PORT}`)
    })
  } catch (error) {
    console.error('Something went wrong', error)
  }
}

start()
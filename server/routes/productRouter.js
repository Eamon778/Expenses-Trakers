const express = require('express')
const { addExpenses, fetchExpenses, deleteExpenses, sendData } = require('../controllers/controller')

const productRouter = express.Router()

productRouter.route('/data').get(sendData)
productRouter.route('/').get(fetchExpenses).post(addExpenses)
productRouter.route('/:id').delete(deleteExpenses)

module.exports = productRouter
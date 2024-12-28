const express = require('express')
const { addExpenses, fetchExpenses, deleteExpenses } = require('../controllers/controller')

const productRouter = express.Router()

productRouter.route('/').get(fetchExpenses).post(addExpenses)
productRouter.route('/:id').delete(deleteExpenses)

module.exports = productRouter
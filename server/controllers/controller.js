const User = require('../models/User')

const sendData = async (req, res) => {
    const user = await User.find()
    res.status(200).json({ success: true, data: user })
}

const addExpenses = async (req, res) => {
    const body = req.body
    const { id } = req.user
    
    try {
        const userData = await User.findByIdAndUpdate(_id=id, { $push: { expenses: body } }, { new: true })
        res.status(200).json({ success: true, message: 'Expense added successfully', data: userData?.expenses })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong', error })
    }
}

const fetchExpenses = async (req, res) => {
    const { id } = req.user

    try {
        const userData = await User.findById(_id=id).select('expenses')
        res.status(200).json({ success: true, data: userData?.expenses })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong', error })
    }
}

const deleteExpenses = async (req, res) => {
    const { id } = req.user
    const expenseId = req.params.id
    try {
        const userData = await User.findByIdAndUpdate(id, { $pull: { expenses: { _id: expenseId } } }, { new: true })
        res.status(200).json({ success: true, message: 'Expense deleted successfully', data: userData?.expenses })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong', error })
    }
}

module.exports = { addExpenses, fetchExpenses, deleteExpenses, sendData }
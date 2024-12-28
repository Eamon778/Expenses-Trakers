const User = require('../models/User')

const addExpenses = async (req, res) => {
    const body = req.body
    const { _id } = req.user
    try {
        const userData = await User.findByIdAndUpdate(_id, { $push: { expenses: body } }, { new: true })
        res.status(200).json({ success: true, message: 'Expense added successfully', data: userData?.expenses })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong', error })
    }
}

const fetchExpenses = async (req, res) => {
    res.status(200).json({ message: 'Hello from the server!' })
}

const deleteExpenses = async (req, res) => {
    res.status(200).json({ message: 'Hello from the server!' })
}

module.exports = { addExpenses, fetchExpenses, deleteExpenses }
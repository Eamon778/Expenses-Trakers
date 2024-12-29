const User = require('../models/User')

const sendData = async (req, res) => {
    const user = await User.find()
    res.status(200).json({ success: true, data: user })
}

const addExpenses = async (req, res) => {
    const body = req.body
    const { id } = req.user
    const _id = id;
    
    try {
        const userData = await User.findByIdAndUpdate(_id, { $push: { expenses: body } }, { new: true })
        console.log(userData)
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

module.exports = { addExpenses, fetchExpenses, deleteExpenses, sendData }
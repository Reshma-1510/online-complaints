const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password'); // Exclude password from the response
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({})
      .populate('sender', 'username accountNumber') // Populate sender info
      .populate('receiver', 'username accountNumber'); // Populate receiver info
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};
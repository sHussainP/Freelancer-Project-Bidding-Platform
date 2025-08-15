const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
    bidder: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true},
    amount: {type: Number, required: true},
    coverLetter: {type: String, required: true},
    date: {type: Date, default: Date.now},
    status: {type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending'}
});

module.exports = mongoose.model('Bid', BidSchema);
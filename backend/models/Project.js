const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    budget: {type: Number, required: true},
    deadline: {type: Date, required: true},
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    status: {type: String, enum: ['open', 'in-progress', 'completed'], default: 'open'},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Project', ProjectSchema);
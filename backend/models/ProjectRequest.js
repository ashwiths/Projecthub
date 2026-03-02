const mongoose = require('mongoose');

const projectRequestSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    collegeName: { type: String, required: true },
    department: { type: String, required: true },
    yearOfStudy: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    projectType: { type: String, required: true },
    projectDomain: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('ProjectRequest', projectRequestSchema);

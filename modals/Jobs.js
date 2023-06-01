const mongoose = require('mongoose')
const users = require('./users')

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    vacancy: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: users,
        required: true
    },
    appliedBy : {
        type : Array,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}) 

const jobs = mongoose.model('jobs' , jobSchema)



module.exports = jobs
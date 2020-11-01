const mongoose = require('mongoose')
const Schema = mongoose.Schema

const candidateSchema = new Schema({
    candidateid:{
        type:int,
    },
    fullname:{
        type:String,
        unique:true
    },
    votecount:{
        type:int,
        default:0
    }

})

const CandidateModel = mongoose.model('Candidate',candidateSchema)
module.exports = CandidateModel
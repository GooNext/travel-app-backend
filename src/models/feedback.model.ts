import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    userName: {type: String, required: true},
    countryId: {type: String, required: true},
    stars: {type: String, required: true, default: ''},
    text: {type: String, required: false, default: ''},
},
    {timestamps: true}
)

const Feedback = mongoose.model('Feedback', feedbackSchema)

module.exports = Feedback
import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const contrySchema = new Schema({
    name: {type: String, required: true},
    stars: {type: String, required: true, default: ''},
    image: {type: String, required: true}
},
    {timestamps: true}
)

const Country = mongoose.model('Country', contrySchema)

module.exports = Country
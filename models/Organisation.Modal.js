const mongoose = require('mongoose')
const validate = require('mongoose-validator')
const mongoosePaginate = require('mongoose-paginate-v2')
var aggregatePaginate = require('mongoose-aggregate-paginate-v2')
let OrganisationSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    branch:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Branch',
            required: true
        }
    ]
},{timestamps: true})

OrganisationSchema.plugin(mongoosePaginate)
OrganisationSchema.plugin(aggregatePaginate)
module.exports=Organisation=mongoose.model('Organistaion',OrganisationSchema)
const mongoose = require('mongoose')
const validate = require('mongoose-validator')
const mongoosePaginate = require('mongoose-paginate-v2')
var aggregatePaginate = require('mongoose-aggregate-paginate-v2')
let BranchSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    role:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        }
    ]
},{timestamps: true})

BranchSchema.plugin(mongoosePaginate)
BranchSchema.plugin(aggregatePaginate)
module.exports=Branch=mongoose.model('Branch',BranchSchema)
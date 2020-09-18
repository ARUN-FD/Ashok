const mongoose = require('mongoose')
const validate = require('mongoose-validator')
const mongoosePaginate = require('mongoose-paginate-v2')
var aggregatePaginate = require('mongoose-aggregate-paginate-v2')
let RoleSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,
        required:true
    }
},{timestamps: true})

RoleSchema.plugin(mongoosePaginate)
RoleSchema.plugin(aggregatePaginate)
module.exports=Role=mongoose.model('Role',RoleSchema)
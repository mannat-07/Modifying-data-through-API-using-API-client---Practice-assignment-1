const { Schema , model } = require('mongoose');

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    description : String,
    price : {
        type : Number,
        required : true
    }
})

const menu =  model('menu', userSchema);
module.exports = menu ;
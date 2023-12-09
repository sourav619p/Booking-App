const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name:String,
    email:{type:String, unique:true}, /*Email must be unique thats why it is giving like this*/
    password:String,
})

const UserModel = mongoose.model('User',UserSchema);

module.exports = UserModel;
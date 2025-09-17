const mongoose = require('mongoose');
const config = require('../config');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:100
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'user'
    }
},{timestamps:true}); 

// Pre-save hook: hash password if it's new or modified
userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')){
        return next();
    }

    const saltRounds = config.bcryptSaltRounds;
    const hashed = await bcrypt.hash(user.password, saltRounds);
    user,password = hashed;
    next();
});

userSchema.methods.comparePassword(function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
});

const mongoModel = mongoose.model('User', userSchema)

module.exports = { mongoModel } 



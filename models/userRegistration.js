const mongoose=require('mongoose');
const registrationSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

const registration=mongoose.model('userRegistration', registrationSchema);
module.exports=registration;
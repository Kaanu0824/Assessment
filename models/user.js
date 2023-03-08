const mongoose = require("mongoose")
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:34,
        trim:true
    },
    lastname:{
        type:String,
        maxlength:32,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    encry_password:{
        type:String,
        require:true
    },
    salt:String,
},{timestamps:true})


userSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv1()
        this.encry_password = this.securePassword(password)   
    })
    .get(function(){
        return this._password 
    })

userSchema.method={
    authenticate:function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },

    securePassword:function(plainpassword){
        if(!plainpassword) return"";

        try{
            return crypto.createHmac("sha256",this.salt).update(plainpassword).digest("hex")
            //crypto is using hasing method
        } catch (err){
            return""
        }
    }
}


module.exports = mongoose.model("User", userSchema)
var mongoose = require('mongoose'), Schema = mongoose.Schema;

// Events schema
var notesSchema = new mongoose.Schema(
    {
       // _id:  mongoose.Schema.Types.ObjectId,
        title:{
            type:String,
            unique:true,
            required: [true, 'Title is Required.'],
        },
        description: String,
        createdBy:{
            type:String,
            required: [true, 'created By is Required.'],
        },
        createdDate:Date,
        modifiedBy:{
            type:String,
        
        },
        modifieDate:{
            type:Date,
        
      
        }
    })
var userSchema= new Schema({
    username:String,
    password:String,
    email:String
})
var notes = mongoose.model('notes', notesSchema)
var user=mongoose.model('users',userSchema)
module.exports = {
    notes: notes,
    user:user
}

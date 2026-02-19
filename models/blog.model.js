import { Schema  , model } from "mongoose";

const blogSchema = new Schema({

    title : {
        type:String,
        minLength : [3 , 'title Should be at least 3 character'],
        maxLength : [30 , 'title Should be at max 30 character'],
        required : true,
        trim : true
    },

    category : {
        type:String,
        minLength : [3 , 'category Should be at least 3 character'],
        maxLength : [100 , 'category Should be at max 100 character'],
        required : true,
        trim : true
    },
    content : {
        type:String,
        minLength : [3 , 'content Should be at least 3 character'],
        maxLength : [3000 , 'content Should be at max 3000 character'],
        required : true,
        trim : true
    },
    tags : {
        type:[String],
        required : true,
    },
} , {
    timestamps : true,
})

const BLOG = new model("blog" , blogSchema);
export default BLOG;
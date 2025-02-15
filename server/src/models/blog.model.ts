import mongoose, { Document , Types } from "mongoose";
interface blogModel extends Document{
    title:string,
    author:Types.ObjectId,
    content:string,
    coverImage:string
}
const blogSchema:mongoose.Schema<blogModel> = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
    coverImage:{
        type:String,
        required:true,
        trim:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

})
const Blog:mongoose.Model<blogModel> = mongoose.model<blogModel>("Blog" , blogSchema);
export default Blog
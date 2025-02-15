import mongoose , {Document , Types} from "mongoose"
interface commentModel extends Document{
    user:Types.ObjectId,
    blog:Types.ObjectId,
    comment:string
}
const commentSchema:mongoose.Schema<commentModel> = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
        required:true
    },
    comment:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
} , {timestamps:true})

const Comment:mongoose.Model<commentModel> = mongoose.model<commentModel>("Comment" , commentSchema);
export default Comment;
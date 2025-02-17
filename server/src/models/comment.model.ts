import mongoose , {Document , Types} from "mongoose"
interface commentModel extends Document{
    userId:Types.ObjectId,
    blogId:Types.ObjectId,
    comment:string
}
const commentSchema:mongoose.Schema<commentModel> = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    blogId:{
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
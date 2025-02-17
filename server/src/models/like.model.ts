import mongoose , {Document , Types} from "mongoose"
interface likeModel extends Document{
    userId:Types.ObjectId,
    blogId:Types.ObjectId,
}

const likeSchema:mongoose.Schema<likeModel> = new mongoose.Schema({
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
} , {timestamps:true})

const Like:mongoose.Model<likeModel> = mongoose.model<likeModel>("Like" , likeSchema);
export default Like;
import mongoose , {Document , Types} from "mongoose"
interface likeModel extends Document{
    user:Types.ObjectId,
    blog:Types.ObjectId,
}

const likeSchema:mongoose.Schema<likeModel> = new mongoose.Schema({
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
} , {timestamps:true})

const Like:mongoose.Model<likeModel> = mongoose.model<likeModel>("Like" , likeSchema);
export default Like;
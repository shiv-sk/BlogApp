import Like from "../models/like.model";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/AsyncHandler";

const likeAndUnlike = asyncHandler(async(req , res)=>{
    const {blogId} = req.params;
    const {userId} = req.body;
    if(!userId){
        throw new ApiError(400 , "userId is required!");
    }
    if(!blogId){
        throw new ApiError(400 , "blogId is required!");
    }
    const existingLike = await Like.findOne({$and:[{userId} , {blogId}]});
    if(existingLike){
        const unlike = await Like.findByIdAndDelete(blogId);
        if(!unlike){
            throw new ApiError(500 , "unlike is not working!");
        }
        res.status(200).json(
            new ApiResponse(200 , "blog unlike successfully! " , {})
        )
        return;
    }
    else{
        const like = await Like.create({
            userId,
            blogId
        })
        if(!like){
            throw new ApiError(500 , "like is not created!");
        }
        res.status(201).json(
            new ApiResponse(201 , "blog liked successfully! " , like)
        )
        return;
    }
})

export {likeAndUnlike};
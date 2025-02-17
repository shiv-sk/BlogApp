import Comment from "../models/comment.model";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/AsyncHandler";

const addComment = asyncHandler(async(req , res)=>{
    const {blogId} = req.params;
    if(!blogId){
        throw new ApiError(400 , "blogId is required!");
    }
    const {userId , comment} = req.body;
    if(!req.body || !Object.keys(req.body) || !(userId && comment)){
        throw new ApiError(400 , "all fields are required!");
    }
    const newComment = await Comment.create({
        blogId,
        userId,
        comment
    })
    if(!newComment){
        throw new ApiError(500 , "add newComment is not created!");
    }
    res.status(201).json(
        new ApiResponse(201 , "commenet added successfully! " , newComment)
    )
})

const getAllCommentsOfBlog = asyncHandler(async(req , res)=>{
    const {blogId} = req.params;
    if(!blogId){
        throw new ApiError(400 , "blogId is required! ");
    }
    const allComments = await Comment.find({blogId});
    if(allComments.length === 0){
        res.status(404).json(
            new ApiResponse(404 , "no comments for the blog!" , {})
        )
        return;
    }
    res.status(200).json(
        new ApiResponse(200 , "allComments are!" , allComments)
    )
})

const updateComment = asyncHandler(async(req , res)=>{
    const {blogId} = req.params;
    if(!blogId){
        throw new ApiError(400 , "blogId is required!");
    }
    const updatedComment = await Comment.findByIdAndUpdate(blogId , req.body , {runValidators:true , new:true});
    if(!updatedComment){
        throw new ApiError(500 , "comment is not updated!");
    }
    res.status(200).json(
        new ApiResponse(200 , "EditedComment is!" , updatedComment)
    )
})

const deleteComment = asyncHandler(async(req , res)=>{
    const {blogId} = req.params;
    const deletedComment = await Comment.findByIdAndDelete(blogId);
    if(!deletedComment){
        throw new ApiError(500 , "comment is not deleted!");
    }
    res.status(200).json(
        new ApiResponse(200 , "comment is deleted! " , deletedComment)
    )
})

export {addComment , updateComment , deleteComment , getAllCommentsOfBlog}
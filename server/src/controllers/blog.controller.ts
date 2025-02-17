import Blog from "../models/blog.model";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/AsyncHandler";
import uploadToCloudinary from "../utils/cloudinary";

//crud on blog
const createBlog = asyncHandler(async(req , res)=>{
    const {title , content , author} = req.body;
    if(!(title && content && author) || !req.body){
        throw new ApiError(400 , "all fields are required!");
    }
    const imagePath = req.file?.path;
    if(!imagePath){
        res.status(400).json(
            new ApiResponse(400 , "image is required!" , {})
        )
        return;
    }
    const uploadMedia = await uploadToCloudinary(imagePath);
    if(!uploadMedia){
        throw new ApiError(500 , "image is not uploaded on cloudinary!");
    }
    const blog = await Blog.create({
        title,
        content,
        coverImage:uploadMedia,
        author
    })
    if(!blog){
        throw new ApiError(500 , "blog is not created!");
    }
    res.status(200).json(
        new ApiResponse(200 , "your file is recived at server side!" , blog)
    )
})

const getBlogs = asyncHandler(async(req , res)=>{
    const blogs = await Blog.find();
    if(blogs.length === 0){
        res.status(404).json(
            new ApiResponse(404 , "blogs are not found!" , {})
        )
        return;
    }
    res.status(200).json(
        new ApiResponse(200 , "blogs are! " , blogs)
    )
})

const getBlog = asyncHandler(async(req , res)=>{
    const {blogId} = req.params;
    if(!blogId){
        throw new ApiError(400 , "blogId is required!")
    }
    const blog = await Blog.findById(blogId);
    if(!blog){
        res.status(404).json(
            new ApiResponse(404 , "blog is not found! " , {})
        )
        return;
    }
    res.status(200).json(
        new ApiResponse(200 , "blog is! " , blog)
    )
})

const upDateBlog = asyncHandler(async(req , res)=>{
    const {blogId} = req.params;
    if(!blogId){
        throw new ApiError(400 , "blogId is required! ");
    }
    let updatedFields = {...req.body};
    if(req.file){
        const imagePath = req.file.path;
        const uploadCloudinary = await uploadToCloudinary(imagePath);
        if(!uploadCloudinary){
            throw new ApiError(500 , "image is not uploaded on cloudinary!")
        }
        updatedFields.coverImage = uploadCloudinary;
    }
    const updatedBlog = await Blog.findByIdAndUpdate(blogId , updatedFields , {runValidators:true , new:true});
    if(!updatedBlog){
        res.status(404).json(
            new ApiResponse(404 , "blog not found! " , {})
        )
        return;
    }
    res.status(200).json(
        new ApiResponse(200 , "updated Blog is! " , updatedBlog)
    )
})

const deleteBlog = asyncHandler(async(req , res)=>{
    const {blogId} = req.params;
    if(!blogId){
        throw new ApiError(400 , "blogId is required! ");
    }
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if(!deletedBlog){
        res.status(404).json(
            new ApiResponse(404 , "blog is not found! " , {})
        )
        return;
    }
    res.status(200).json(
        new ApiResponse(200 , "blog is deleted successfully!" , deletedBlog)
    )
})
export {createBlog , getBlogs , getBlog , upDateBlog , deleteBlog}; 
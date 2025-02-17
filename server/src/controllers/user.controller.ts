import User from "../models/user.model";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/AsyncHandler";
import { userDocument } from "../models/user.model";
import Jwt, { JwtPayload } from "jsonwebtoken";

//generate token
const generateToken = (user: userDocument) : string | undefined=>{
    try {
        if(!process.env.JWT_SECRET){
            throw new Error("Jwt secret is not mentioned! ");
        }
        return Jwt.sign({id:user._id , name:user.name} , process.env.JWT_SECRET as string , {expiresIn:"3d"})
    } catch (error) {
        console.log("error while creating token fron jwt! " , error);
        throw error;
    }
}
const cookieOptions = {
    httpOnly:true,
    secure:true,
}
//registerUser 
const registerUser = asyncHandler(async(req , res)=>{
    const {name , email , password} = req.body;
    if(!req.body || !Object.keys(req.body) || !(name && email && password)){
        throw new ApiError(400 , "all fields are required! ");
    }
    const user = await User.findOne({email});
    if(user){
        res.status(200).json(
            new ApiResponse(400 , "user is already exists!" , {})
        )
        return;
    }
    const newUser = await User.create({
        name,
        email,
        password
    })
    const accessToken = await generateToken(newUser);
    res.status(201).cookie("accessToken" , accessToken , cookieOptions).json(
        new ApiResponse(201 , "user is created successfully! " , newUser)
    )
})
// loginUser
const loginUser = asyncHandler(async(req , res)=>{
    const {email , password} = req.body;
    if(!req.body || !Object.keys(req.body) || !(email && password)){
        throw new ApiError(400 , "all fields are required! ");
    }
    const user = await User.findOne({email});
    if(!user){
        res.status(200).json(
            new ApiResponse(400 , "user is not found!" , {})
        )
        return;
    }
    const isPasswordCorrect = user.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        res.status(400).json(
            new ApiResponse(400 , "password is not correct! " , {})
        )
        return;
    }
    const accessToken = await generateToken(user);
    res.status(200).cookie("accessToken" , accessToken , cookieOptions).json(
        new ApiResponse(200 , "user is created successfully! " , user)
    )
})

// logoutUser 
const logoutUser = asyncHandler(async(req , res)=>{
    const token = req.cookies?.accessToken;
    if(!token){
        throw new ApiError(403 , "jwt Token is missing!")
    }
    res.status(200).clearCookie("accessToken" , cookieOptions).json(
        new ApiResponse(200 , "user logout successfully! ", {})
    )
})

// getCurrentUser
const getCurrentUser = asyncHandler(async(req , res)=>{
    const token = req.cookies.accessToken;
    if(!token){
        throw new ApiError(403 , "token is not found!");
    }
    const decodeToken = Jwt.verify(token , process.env.JWT_SECRET as string) as JwtPayload;
    if(!decodeToken){
        throw new ApiError(400 , "token is decoded!");
    }
    const userId = decodeToken.id;
    if(!userId){
        throw new ApiError(400 , "userId is not defined");
    }
    const user = await User.findById(userId);
    if(!user){
        res.status(404).json(
            new ApiResponse(404 , "user is not found!" , {})
        )
        return;
    }
    res.status(200).json(
        new ApiResponse(200 , "current user is! " , user)
    )
})

// updateUser
const updateUser = asyncHandler(async(req , res)=>{
    const {userId} = req.params;
    if(!userId){
        throw new ApiError(400 , "userId is required!");
    }
    const user = await User.findByIdAndUpdate(userId , req.body , {runValidators:true , new:true});
    if(!user){
        res.status(404).json(
            new ApiResponse(404 , "user not found! " , {})
        )
        return;
    }
    res.status(200).json(
        new ApiResponse(200 , "user is updated succesfully! " , user)
    )
})
 
// deleteUser
const deleteUser = asyncHandler(async(req , res)=>{
    const {userId} = req.params;
    if(!userId){
        throw new ApiError(400 , "userId is required! ");
    }
    const user = await User.findByIdAndDelete(userId);
    if(!user){
        res.status(404).json(
            new ApiResponse(404 , "user not found!" , {})
        )
        return;
    }
    res.status(204).json()
})

export {registerUser , loginUser , logoutUser , getCurrentUser , updateUser , deleteUser};
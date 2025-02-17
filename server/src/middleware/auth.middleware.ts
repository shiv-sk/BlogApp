import User from "../models/user.model";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/AsyncHandler";
import Jwt, { JwtPayload } from "jsonwebtoken";

const verifyUser = asyncHandler(async(req , res , next)=>{
    const token = req.cookies?.accessToken;
    if(!token){
        throw new ApiError(403 , "your are forbidden!");
    }
    const decodedToken = Jwt.verify(token , process.env.JWT_SECRET as string) as JwtPayload;
    if(!decodedToken){
        throw new ApiError(500 , "token is missing or expired!");
    }
    const userId = decodedToken.id;
    if(!userId){
        throw new ApiError(500 , "userId is missing!");
    }
    const user = await User.findById(userId);
    if(!user){
        res.status(404).json(
            new ApiResponse(404 , "user not found!" , {})
        )
        return;
    }
    next();
})

export {verifyUser};
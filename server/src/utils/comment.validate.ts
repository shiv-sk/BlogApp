import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import ApiResponse from "./ApiResponse";
const commentSchema = Joi.object({
    comment:Joi.string().trim().required()
})

const commentValidate = (schema: Joi.ObjectSchema)=>{
    return (req:Request , res:Response , next:NextFunction)=>{
        const {error} = schema.validate(req.body , {abortEarly:false});
        if(error){
            res.status(400).json(
                new ApiResponse(400 , error.details.map(detail => detail.message).join(", ") , {})
            )
            return;
        }
        next(); 
    }
}

export {commentSchema , commentValidate};
import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import ApiResponse from "./ApiResponse";
const blogSchema = Joi.object({
    title:Joi.string().max(120).trim().required(),
    content:Joi.string().max(500).trim().required()
})

const blogValidate = (schema: Joi.ObjectSchema)=>{
    return (req:Request , res:Response , next:NextFunction)=>{
        const {error} = schema.validate(req.body , { abortEarly: false });
        if(error){
            res.status(400).json(
                new ApiResponse(400 , error.details.map(detail => detail.message).join(", ") , {})
            )
            return;
        }
        next();
    }
}

export {blogSchema , blogValidate};
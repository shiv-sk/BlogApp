import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import ApiResponse from "./ApiResponse";
const regitserSchema = Joi.object({
    name:Joi.string().min(3).max(40).trim().lowercase().required(),
    email:Joi.string().email().trim().lowercase().required(),
    password:Joi.string().min(3).trim().required()
})

const loginSchema = Joi.object({
    email:Joi.string().email().trim().lowercase().required(),
    password:Joi.string().min(3).required()
})

//middleware
const validateData = (schema:Joi.ObjectSchema)=>{
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

export {regitserSchema , loginSchema , validateData};
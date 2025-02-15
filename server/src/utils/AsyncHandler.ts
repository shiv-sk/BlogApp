import { Request , Response , NextFunction } from "express";
type AsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;
const asyncHandler = (func:AsyncRouteHandler)=>{
    return async (req: Request , res: Response , next:NextFunction)=>{
        try {
            await func(req,res,next)
        } catch (error:any) {
            console.log("the error is: " , error);
            res.status(error.statusCode || 500).json({
                status:error.status,
                message:error.message,
                
            })
        }
    }
}

export default asyncHandler;
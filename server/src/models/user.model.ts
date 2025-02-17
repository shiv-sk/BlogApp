import mongoose , {Document} from "mongoose";
import bcrypt from "bcrypt";

interface userModel extends Document{
    name:string,
    email:string,
    password:string,
}

interface userMethods{
    isPasswordCorrect(password: string):Promise<boolean>
}

export interface userDocument extends userMethods , userModel , Document{}
const userSchema:mongoose.Schema<userDocument> = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
} , {timestamps:true})

userSchema.pre("save" , async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password , 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password : string):Promise<boolean>{
    return await bcrypt.compare(password , this.password);
}

const User:mongoose.Model<userDocument> = mongoose.model<userDocument>("User" , userSchema);
export default User;
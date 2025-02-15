import mongoose from "mongoose";
const DBconn = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("DB is connnected successFully! ");
    } catch (error) {
        console.error("error from DBConnection! " , error);
        process.exit(1);
    }
}

export default DBconn;
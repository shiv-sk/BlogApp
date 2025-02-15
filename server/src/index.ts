import app from "./app";
import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
})
import DBconn from "./connection/Db.connection";
const port = process.env.PORT || 3000;
DBconn()
.then(()=>{
    app.listen(port , ()=>{
        console.log(`server is started at port ${port}`);
    })
})
.catch((error)=>{
    console.error("error from DBCon-serverCon! " , error);
})
import express from "express";
const app = express();
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
const allowedOrigins: string[] = ["http://localhost:5173", "other url"];
const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOptions));

//routers
import userRoutes from "./routes/user.routes";
app.use("/api/v1/user" , userRoutes);

import blogRoutes from "./routes/blog.routes";
app.use("/api/v1/blog" , blogRoutes);

export default app;
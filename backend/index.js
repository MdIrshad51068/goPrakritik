import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routers/user.route.js";
import JobRoute from "./routers/job.route.js";
import applicationRoute from "./routers/application.route.js";
import path from "path";//just for render

dotenv.config({});

const app = express();

const _dirname=path.resolve();//just for render

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", JobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname,"frontend/dist")))//for render
app.get(/.*/,(_,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})



app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})
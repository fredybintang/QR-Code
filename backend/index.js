import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import GuestRoute from "./routes/GuestRoute.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(GuestRoute);
app.use(express.static("public"));

app.listen(process.env.APP_PORT, ()=> {
    console.log('Server Running');
});
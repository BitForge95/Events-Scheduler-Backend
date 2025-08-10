import express from "express"
import router from "./routes/user.route.js";
import cors from "cors";

const app = express()
app.use(cors({
  origin: "https://events-scheduler.netlify.app", 
  credentials: true
}));
app.use(express.json());
app.use("/", router);



export {app}
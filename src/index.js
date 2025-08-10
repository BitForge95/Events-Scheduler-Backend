import dotenv from "dotenv"
import dbConnect from "./lib/dbConnect.js";
import { app } from "./app.js";
import cors from "cors"

dotenv.config({
    path: './.env'
})

const app = express();
app.use(cors())


dbConnect()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Listening on PORT ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

import express from "express";
import dotenv  from "dotenv";
import { connectDB } from "./src/db/db.js";
import path  from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config("./env")
const PORT = process.env.PORT
const app = express()
const __filename = fileURLToPath(import.meta.url) 
const __dirName = path.dirname(__filename)


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.set("view engine", "ejs")
app.set('views', path.join(__dirName,"views"))
app.use(express.static(path.join(__dirName,"public")))
app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

// Impprorting Routes
import staticRoute from "./src/routes/static.route.js";


// Forwarding all request to defined routes
app.use('/',staticRoute)

app.listen(PORT, ()=> {
    console.log("Server listening on:",PORT);
    connectDB()
})
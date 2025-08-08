import express from "express"
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from "./src/db/db.js";
import {short_Url} from "./src/model/shortUrl.model.js"


dotenv.config("./env")

const app = express()
const port = process.env.PORT || 3000

// Common middlewares
app.use(express.json()) // It takes the whatever data coming in JSON and convert into JS Object and attach with req.body and move it forward

app.use(express.urlencoded({extended:true})) // It takes the whatever Form data coming from HTML form and convert into JS Object and attach with req.body and move it forward

app.use(express.static("public")) // Tell the broswer where the static files are so that browser can render that 

app.use(cors({
    origin: process.env.CORS_ORIGIN
})); // Use to tell only take request from frontend url which are mentioned 

// Import Route
import redirectFromShortUrl from "./src/route/urlShortner.route.js"
import createUrlshortner from "./src/route/createShortUrl.route.js"


// Routes
app.use("/",redirectFromShortUrl )

app.use("/api/v1/",createUrlshortner) 


app.listen(port, () => {
    connectDB()
    console.log(`Server is listening on port ${port}`)
})
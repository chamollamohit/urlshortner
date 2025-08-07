import { Router } from "express";
import {createShortUrl} from "../controller/createShortUrl.controller.js"
const router = Router()


router.route("/create").post(createShortUrl)



export default router 
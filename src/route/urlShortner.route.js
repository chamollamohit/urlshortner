import { Router } from "express";
import {urlShortner} from "../controller/urlShortner.controller.js"
const router = Router()

// This will help in chaining multiple method like get, post, put etc
// we can other option like router.post("/",urlShortner)
router.route("/:id").get(urlShortner)

export default router 
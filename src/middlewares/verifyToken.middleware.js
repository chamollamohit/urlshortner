import { apiResponse } from "../utils/apiResponse.js"
import { apiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Users } from "../models/user.model.js";
import jwt from "jsonwebtoken";


const verifyToken = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.redirect('/login')
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.userToken = decodedToken
        return next()

    } catch (error) {
        return res.clearCookie('token').redirect('/login')
    }
})

const isLoggedIn = asyncHandler(async (req, res, next) => {

    try {
        const token = req.cookies.token
        if (!token) {
            return next()
        }
        jwt.verify(token, process.env.JWT_SECRET)
        res.redirect('/dashboard')
    } catch (error) {
        res.clearCookie('token')
        return res.redirect('/login')
    }
})



export { verifyToken, isLoggedIn }
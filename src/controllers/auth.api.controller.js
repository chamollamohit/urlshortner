import { apiResponse } from "../utils/apiResponse.js"
import { apiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Users } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
    const { username, name, password } = req.body
    const user = await Users.create({
        username: username,
        name: name,
        password: password
    })
    if (!user) {
        throw new apiError(400, "Unable to register user!!!")
    }
    res.status(200).json(new apiResponse(200, user, "User created Successfully !!"))
})

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    const user = await Users.findOne({ username })
    if (!user) {
        return res.status(401).json(new apiResponse(401, null, "Invalid Credential!!!"))
    }
    const isPassword = await user.isPasswordCorrect(password)
    if (!isPassword) {
        return res.status(401).json(new apiResponse(401, null, "Invalid Credential!!!"))
    }
    const payload = { id: user._id, name: user.name }
    const options = {
        httpOnly: true
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET,{ expiresIn: "1h" })
    res.cookie("token", token, options).json(new apiResponse(200, user, 'Logged in successfully'))

})




export { registerUser, loginUser }
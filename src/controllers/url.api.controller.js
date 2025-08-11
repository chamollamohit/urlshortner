import { apiResponse } from "../utils/apiResponse.js"
import { apiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { urlInfo } from "../models/url.model.js";
import { nanoid } from "nanoid";



const createShortUrl = asyncHandler(async (req, res) => {
    const { fullUrl } = req.body
    const shortUrl = nanoid(7)
    const id = req.userToken.id
    
    const url = await urlInfo.create({
        fullUrl: fullUrl,
        shortUrl: process.env.APP_URL+ shortUrl,
        user: id
    })
    if (!url) {
        throw new apiError(400, "Something went wrong while creating Shorten Url")
    }
    return res.status(200).json(new apiResponse(200, url, "Shorten Url Created"))
})

const getShortUrl = asyncHandler(async (req, res) => {
    const id = req.userToken.id
    const url = await urlInfo.find({user:id})
    if (!url) {
        throw new apiError(400, "Something went wrong while getting your Shorten Urls")
    }
    res.status(200).json(new apiResponse(200, url, "Recieved all shorten urls"))
})


const deleteUrl = asyncHandler(async (req, res) => {
    const url = await urlInfo.findByIdAndDelete(req.params.id)
    if (!url) {
        throw new apiError(500, "Something went wrong whilte deleting url")
    }

    res.status(200).json(new apiResponse(200, url, "Url deleted!!!"))

})

const redirectUrl = asyncHandler(async (req, res) => {
    const id = req.params.id
    
    const url = await urlInfo.findOneAndUpdate({ shortUrl: process.env.APP_URL +`${id}` }, {
        $inc: { click: 1 }
    })
    if (!url) {
        throw new apiError(500, "nothing to redirect here")
    }
    console.log(url.fullUrl);
    
    res.redirect(url.fullUrl) /// Need to add redirect logic here
})



export { createShortUrl, getShortUrl, deleteUrl, redirectUrl }
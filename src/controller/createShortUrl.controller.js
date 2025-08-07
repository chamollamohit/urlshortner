import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {short_Url} from "../model/shortUrl.model.js"
import { nanoid } from "nanoid"

const createShortUrl = asyncHandler(async (req, res) => {
    const {url, user} = req.body
    const newshortUrl = nanoid(7)
    const newUrl = await short_Url.create({
        fullUrl: url,
        shortUrl: process.env.APP_URL + newshortUrl
    })
    if(!newUrl) throw new ApiError(500, "Something went wrong while genrerating Short Url")
    // if (user) {
    //     newUrl.user = user.tostring();
    //     newUrl.save()
    // }

    res.status(200).json(new ApiResponse(200, newUrl, "Shorten Url Created"))
    
}
)



export { createShortUrl }
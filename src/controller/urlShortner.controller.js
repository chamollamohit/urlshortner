import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {short_Url} from "../model/shortUrl.model.js"

const urlShortner = asyncHandler(async (req,res) => {
    const {id} = req.params
    
    const url = await short_Url.findOneAndUpdate({shortUrl: process.env.APP_URL + id},{$inc:{clicks:1}}, { new: true })
    
    if(url){
        res.redirect(url.fullUrl)
    }else {
        res.status(404).send("Not Found")
    }
    
})



export { urlShortner }
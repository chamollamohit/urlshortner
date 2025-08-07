import { mongoose, Schema } from "mongoose";

const shortUrlSchema = new Schema({
    fullUrl :{
        type : String,
        required: true
    },
    shortUrl :{
        type : String,
        required: true,
        index: true,
        unique: true
    },
    clicks :{
        type : Number,
        required: true,
        default: 0
    },
    user :{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

export const short_Url = mongoose.model("short_Url", shortUrlSchema)
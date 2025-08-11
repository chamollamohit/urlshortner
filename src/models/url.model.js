import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    fullUrl: {
        type: String,
        required: true,

    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    click: {
        type: Number,
        default: 0
    }
})
urlSchema.index({ fullUrl: 1, user: 1 }, { unique: true });

export const urlInfo = mongoose.model("urlInfo", urlSchema)
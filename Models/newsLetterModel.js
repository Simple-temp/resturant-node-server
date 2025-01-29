import mongoose from "mongoose";

const newsLetterSchema = (
    {
        newletter : { type: String },
    }
)

const NewsLetter = mongoose.model("NewsLetter",newsLetterSchema)

export default NewsLetter ;
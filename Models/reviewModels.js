import mongoose from "mongoose";

const reviewSchema = (
    {
        message : { type: String },
    }
)

const Review = mongoose.model("Review",reviewSchema)

export default Review ;
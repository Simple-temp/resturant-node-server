import mongoose from "mongoose";

const foodSchema = (
    {
        name : { type: String, require: true},
        img : { type: String, require: true},
        quantity : { type: Number, require: true},
        price : { type: Number, require: true},
        des : { type: String, require: true},
        rating : { type: Number, require: true},
        review : { type: Number, require: true},
        stock : { type: Number, require: true},
    }
)

const Food = mongoose.model("Food", foodSchema)

export default Food;


import mongoose from "mongoose";

const messageSchema = (
    {
        name : { type: String },
        email : { type: String },
        phone : { type: String },
        message : { type: String },
    }
)

const Message = mongoose.model("Message",messageSchema)

export default Message ;
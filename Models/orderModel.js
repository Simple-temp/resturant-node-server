import mongoose from "mongoose";

const orderSchema = (
    {
        userid : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            require : true
        },
        foodItem : [
            {
                name : { type: String, require: true},
                img : { type: String, require: true},
                quantity : { type: Number, require: true},
                price : { type: Number, require: true},
                des : { type: String, require: true},
                rating : { type: Number, require: true},
                review : { type: Number, require: true},
                stock : { type: Number, require: true},
                food_id : {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : "Food",
                    require : true,
                }
            }
        ],
        shippingAddress : {
            country : { type: String, require: true},
            address : { type: String, require: true},
            postalCode : { type: String, require: true},
            phone : { type: String, require: true},
        },
        paymentMethod : { type: String, require: true},
        itemPrice : { type: Number, require: true},
        totalPrice : { type: Number, require: true},
        isPaid : { type: Boolean, default: false},
        paidAt : { type: Date},
        isDelivered : { type: Boolean, default: false},
        devliveredAt : { type: Date},
    }
)

const Order = mongoose.model("Order", orderSchema)

export default Order;


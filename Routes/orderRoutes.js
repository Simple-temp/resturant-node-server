import express from "express"
import { isAuth } from "../IsAuth.js";
import Order from "../Models/orderModel.js";

const orderRoutes = express.Router()

orderRoutes.post("/", isAuth, async(req, res)=>{

    console.log(req.user._id)

    const newOrder = new Order({
        userid : req.user._id,
        foodItem : req.body.foodItem.map( x => ({ ...x, food_id:x._id }) ),
        shippingAddress : req.body.shippingAddress,
        paymentMethod : req.body.paymentMethod,
        itemPrice : req.body.itemPrice,
        totalPrice : req.body.totalPrice,
        paidAt : new Date(),
        devliveredAt : new Date(),
    })

    console.log(newOrder)

    const order = await newOrder.save()

    res.status(201).send({ message : "New order created", order })

})

export default orderRoutes;
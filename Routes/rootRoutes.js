import express from "express"
import Food from "../Models/foodModel.js";
import { foods } from "../fakedb.js";

const rootRoutes = express.Router()

rootRoutes.get("/", async (req,res)=>{

    await Food.remove({})
    const createFood = await Food.insertMany(foods)
    res.send({ createFood })

})

export default rootRoutes;
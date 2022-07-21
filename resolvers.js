import bcrypt from "bcryptjs";
import User from "./Models/userModel.js";
import Food from "./Models/foodModel.js";
import Order from "./Models/orderModel.js";
import { generateToken } from "./generateToken.js";


const resolvers = {

    Query : {
        users : async ()=> await User.find({}),
        user : async (_,{_id})=> await User.findById({_id}),
        foods : async ()=> await Food.find({}),
        food : async (_,{_id})=> await Food.findById({_id}),
        orders : async ()=> await Order.find({}),
        order : async (_,{_id}) => await Order.findById({_id}),
        myorders : async (_,args,{isAuth}) => {
            if(!isAuth){
                throw new Error("You must be login")
            }
            return await Order.find({userid : isAuth._id})
        }
    },

    Mutation : {

        createuser : async (_,{createUser}) =>{

            const user = await User.findOne ({ email : createUser.email })

            if(user){
                throw new Error("This user already Exits")
            }
            
            const hashPassword = await bcrypt.hash(createUser.password, 12)

            const newUser = new User({
                _id : createUser._id,
                name : createUser.name,
                email : createUser.email,
                password : hashPassword,
                isAdmin : createUser.isAdmin,
                token : generateToken(createUser)
            })

            return await newUser.save()

        },
        loginuser : async (_,{loginUser}) =>{

            const user = await User.findOne({ email: loginUser.email })
            if(!user){
                throw new Error ("This user dosen't Exits")
            }

            const doMatch = await bcrypt.compare(loginUser.password, user.password)

            if(!doMatch){
                throw new Error("Invalid password")
            }

            return {
                _id : user._id,
                name : user.name,
                email : user.email,
                password : user.password,
                isAdmin : user.isAdmin,
                token : generateToken(user)
            }

        },
        deluser : async (_,{_id}) =>{

            const user = await User.findById({_id})

            return await user.deleteOne()

        },
        updateuser : async (_,{updateUser},{isAuth}) =>{

            if(!isAuth) throw new Error ("You must be login")
            
            const user = await User.findById({ _id : isAuth._id })

            if(user){
                user.name = updateUser.name || user.name 
                user.email = updateUser.email || user.email 
                if(updateUser.password){
                    user.password = bcrypt.hashSync(updateUser.password, 12) || user.password 
                }
                user.isAdmin = updateUser.isAdmin || user.isAdmin 
            }

            return user.save()

        },

        // =========================================================================================================

        createfood : async (_,{createFood}) =>{

            const newFood = new Food({
                ...createFood
            })

            return await newFood.save()

        },

        delfood : async (_,{_id}) =>{

            const food = await Food.findById({_id})
            
            return await food.deleteOne()
        },

        updatefood : async (_,{updateFood}) =>{

            const food = await Food.findById({ _id : updateFood._id})

            if(food){
                food.name = updateFood.name || food.name 
                food.img = updateFood.img || food.img 
                food.quantity = updateFood.quantity || food.quantity 
                food.price = updateFood.price || food.price 
                food.des = updateFood.des || food.des 
                food.rating = updateFood.rating || food.rating 
                food.review = updateFood.review || food.review 
                food.stock = updateFood.stock || food.stock 
            }

            return await food.save()
            
        },

        // =========================================================================================================

        createorder : async (_,{createOrder}) => {

            const order = new Order({
                ...createOrder
            })

            return await order.save()

        },

        delorder : async (_,{_id}) =>{
            
            const order = await Order.findById({_id})

            return await order.deleteOne()

        },

        ispaid : async (_,{_id})=>{

            const order = await Order.findById({_id})
            if(order){
                order.isPaid = true
            }

            return await order.save()

        },

        isdelivered : async (_,{_id})=>{

            const order = await Order.findById({_id})
            if(order){
                order.isDelivered = true
            }

            return await order.save()

        },

    }

}

export default resolvers;
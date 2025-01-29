import bcrypt from "bcryptjs";
import User from "./Models/userModel.js";
import Food from "./Models/foodModel.js";
import Order from "./Models/orderModel.js";
import { generateToken } from "./generateToken.js";
import Review from "./Models/reviewModels.js";
import Message from "./Models/messageModels.js";
import NewsLetter from "./Models/newsLetterModel.js";


const resolvers = {

    Query : {
        review : async ()=> await Review.find({}),
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
        },
        message : async ()=> await Message.find({}),
    },

    Mutation : {

        createuser : async (_,{createUser}) =>{

            const user = await User.findOne ({ email : createUser.email })

            if(user){
                throw new Error("This user already Exits")
            }
            
            const hashPassword = await bcrypt.hash(createUser.password, 12)

            const newUser = new User({
                name : createUser.name,
                email : createUser.email,
                password : hashPassword,
            })

            const createdUser = await newUser.save()

            return ({
                _id : createdUser._id,
                name : createdUser.name,
                email : createdUser.email,
                password : hashPassword,
                isAdmin : createdUser.isAdmin,
                token : generateToken(createdUser)
            })

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
            }

            return await user.save()

        },

        makeAdmin : async (_,{_id}) => {

            const admin = await  User.findById({_id})
            if(admin){
                admin.isAdmin = true
            }

            return await admin.save()
        },
        removeAdmin : async (_,{_id}) =>{

            const admin = await  User.findById({_id})
            if(admin){
                admin.isAdmin = false
            }

            return await admin.save()
        },

        // =========================================================================================================

        createfood : async (_,{createFood}) =>{

            const newFood = new Food({
                ...createFood
            })

            return await newFood.save()

        },

        createreview : async (_,{createReview}) =>{

            const newFood = new Review({
                ...createReview
            })

            console.log(newFood)

            return await newFood.save()

        },

        
        createmessage : async (_,{createMessage}) =>{

            console.log(createMessage)

            const newFood = new Message({
                ...createMessage
            })

            console.log(newFood)

            return await newFood.save()

        },

        createnewsletter : async (_,{createNewsletter}) =>{

            console.log(createNewsletter)

            const newFood = new NewsLetter({
                ...createNewsletter
            })

            console.log(newFood)

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
                food.quantity = updateFood.quantity || 1 
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
import { gql } from "apollo-server-express"

const typeDefs = gql `

    type Query {
        users : [Users]
        user ( _id : ID! ) : Users
        foods : [Foods]
        food ( _id : ID! ) : Foods
        orders : [Orders]
        order ( _id : ID! ) : Orders
        myorders : [Orders]
    }

    type Users{
        _id : ID!
        name : String!
        email : String!
        password : String!
        isAdmin : Boolean!
        token : String!
    }

    type Foods {
        _id : ID!
        name : String!
        img : String!
        quantity : Int!
        price : Float!
        des : String!
        rating : Float!
        review : Int!
        stock : Int!
    }

    scalar Date

    type Orders {
        _id : ID!
        userid : ID!
        foodItem : [Foods]
        paymentMethod : String!
        itemPrice : Int!
        totalPrice : Float!
        isPaid : Boolean!
        paidAt : Date
        isDelivered : Boolean!
        devliveredAt : Date
    }

    type Mutation {
        createuser ( createUser : createUser! ) : Users
        deluser ( _id : ID! ) : Users
        loginuser ( loginUser : loginUser! ) : Users
        updateuser ( updateUser : updateUser! ) : Users

        createfood ( createFood : createFood! ) : Foods
        delfood ( _id : ID! ) : Foods
        updatefood ( updateFood : updateFood! ) : Foods

        createorder ( createOrder : createOrder! ) : Orders
        delorder ( _id : ID! ) : Orders
        ispaid ( _id : ID! ) : Orders
        isdelivered ( _id : ID! ) : Orders
    }

    input createUser {
        name : String!
        email : String!
        password : String!
    }

    input loginUser {
        email : String!
        password : String!
    }

    input updateUser {
        name : String!
        email : String!
        password : String!
    }

    input createFood {
        name : String!
        img : String!
        quantity : Int!
        price : Float!
        des : String!
        rating : Float!
        review : Int!
        stock : Int!
    }

    input updateFood {
        _id : ID!
        name : String!
        img : String!
        quantity : Int!
        price : Float!
        des : String!
        rating : Float!
        review : Int!
        stock : Int!
    }

    input createOrder {
        userid : ID!
        foodItem : [createFood]
        paymentMethod : String!
        itemPrice : Int!
        totalPrice : Float!
        isPaid : Boolean!
        paidAt : Date
        isDelivered : Boolean!
        devliveredAt : Date
    }

`

export default typeDefs
import { gql } from "apollo-server-express"

const typeDefs = gql `

    type Query {
        review : [Review]
        users : [Users]
        user ( _id : ID! ) : Users
        foods : [Foods]
        food ( _id : ID! ) : Foods
        orders : [Orders]
        order ( _id : ID! ) : Orders
        myorders : [Orders]
        message : [Message]
    }

    type Users{
        _id : ID!
        name : String!
        email : String!
        password : String!
        isAdmin : Boolean!
        token : String!
    }

    type Message{
        _id : ID!
        name : String!
        email : String!
        phone : String!
        message : String!
    }

    type NewsLetter{
        _id : ID!
        newletter : String!
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

    type Shipping {
        country : String!
        address : String!
        postalCode : String!
        phone : String!
    }

    scalar Date

    type Orders {
        _id : ID!
        userid : ID!
        foodItem : [Foods]
        shippingAddress : Shipping
        paymentMethod : String!
        itemPrice : Int!
        totalPrice : Float!
        isPaid : Boolean!
        paidAt : Date
        isDelivered : Boolean!
        devliveredAt : Date
    }

    type Review {
        _id : ID!
        message : String!
    }

    type Mutation {

        createnewsletter ( createNewsletter : createNewsletter! ) : NewsLetter
        createreview ( createReview : createReview! ) : Review
        createmessage ( createMessage : createMessage! ) : Message
        createuser ( createUser : createUser! ) : Users
        deluser ( _id : ID! ) : Users
        loginuser ( loginUser : loginUser! ) : Users
        updateuser ( updateUser : updateUser! ) : Users
        makeAdmin ( _id : ID! ) : Users
        removeAdmin ( _id : ID!) : Users

        createfood ( createFood : createFood! ) : Foods
        delfood ( _id : ID! ) : Foods
        updatefood ( updateFood : updateFood! ) : Foods

        createorder ( createOrder : createOrder! ) : Orders
        delorder ( _id : ID! ) : Orders
        ispaid ( _id : ID! ) : Orders
        isdelivered ( _id : ID! ) : Orders
    }

    input createNewsletter {
        newletter: String!
    }

    input createMessage{
        name : String!
        email : String!
        phone : String!
        message : String!
    }

    input createReview {
        message: String!
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
        name : String
        email : String
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
        name : String
        img : String
        quantity : Int
        price : Float
        des : String
        rating : Float
        review : Int
        stock : Int
    }

    input OrderedFood {
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

    input ShippingADDress {
        country : String!
        address : String!
        postalCode : String!
        phone : String!
    }

    input createOrder {
        userid : ID!
        foodItem : [OrderedFood] 
        shippingAddress : ShippingADDress
        paymentMethod : String!
        itemPrice : Int!
        totalPrice : Float!
        isPaid : Boolean
        paidAt : Date
        isDelivered : Boolean
        devliveredAt : Date
    }

`

export default typeDefs
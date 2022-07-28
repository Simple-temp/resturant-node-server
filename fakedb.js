export const users = [
    {
        _id : "1",
        name : "user1",
        email : "email1@yahoo.com",
        password : "1234",
        isAdmin : false,
    },
    {
        _id : "2",
        name : "user1",
        email : "email1@yahoo.com",
        password : "1234",
        isAdmin : false,
    },
    {
        _id : "3",
        name : "user1",
        email : "email1@yahoo.com",
        password : "1234",
        isAdmin : false,
    },
]

export const foods = [
    {
        name: "Homemade",
        img: "https://res.cloudinary.com/image-hosting-api/image/upload/v1659005716/rs1_fz4yoy.png",
        quantity: 1,
        price: 10,
        des: "Want to know where this information comes from? Learn more Images may be subject to copyright",
        rating: 3.4,
        review: 22,
        stock: 3
    },
    {
        name: "Noodles",
        img: "https://res.cloudinary.com/image-hosting-api/image/upload/v1659005715/rs2_xznxz3.png",
        quantity: 1,
        price: 20,
        des: "Want to know where this information comes from? Learn more Images may be subject to copyright",
        rating: 3.4,
        review: 22,
        stock: 3
    },
    {
        name: "Egg",
        img: "https://res.cloudinary.com/image-hosting-api/image/upload/v1659005714/rs3_iulxiq.png",
        quantity: 1,
        price: 30,
        des: "Want to know where this information comes from? Learn more Images may be subject to copyright",
        rating: 3.4,
        review: 22,
        stock: 3
    },
    {
        name: "Sushi Dizzy",
        img: "https://res.cloudinary.com/image-hosting-api/image/upload/v1659005714/rs4_s48w22.png",
        quantity: 1,
        price: 40,
        des: "Want to know where this information comes from? Learn more Images may be subject to copyright",
        rating: 3.4,
        review: 22,
        stock: 3
    },
    {
        name: "The Coffee Break",
        img: "https://res.cloudinary.com/image-hosting-api/image/upload/v1659005714/rs5_c1m07r.png",
        quantity: 1,
        price: 40,
        des: "Want to know where this information comes from? Learn more Images may be subject to copyright",
        rating: 3.4,
        review: 22,
        stock: 3
    },
]

export const orders = [
    {
        _id : "11",
        userid : "1",
        foodItem : [
            {
                _id : "1",
                name : "p1",
                img : "email1@yahoo.com",
                quantity : 1,
                price : 22.9,
                des : "this is a description",
                rating : 4.0,
                review : 3,
                stock : 2
            },
        ],
        paymentMethod : "paypal",
        itemPrice : 22,
        totalPrice : 30.2,
        isPaid : false,
        paidAt : new Date(),
        isDelivered : false,
        devliveredAt : new Date()
    },
]

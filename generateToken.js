import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        password: user.password,
        isAdmin: user.isAdmin,
    },
        process.env.JWT_TOKEN,
        {
            expiresIn: "1d"
        }
    )
}
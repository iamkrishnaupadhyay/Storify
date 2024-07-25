const UserModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

const getUserByEmail = async (email) => {
    const user = await UserModel.findOne({ email });
    return user;
};

const generateJWTToken = (obj) => {
    const token = jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + (60 * 60), // Date.now returns time in miliseconds from 1 Jan 1970, // seconds
            data: obj,
        },
        process.env.JWT_SECRET_KEY,
    )
    return token;
}

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email);
        console.log(password);
        if (!password || !email) {
            res.status(400).json({
                status: "fail",
                message: "Please provide email and password",
                data: [],
            });
            return;
        }

        const user = await getUserByEmail(email);
        if (user) {
            res.status(400).json({
                status: "fail",
                message: "User already exists",
                data: [],
            });
            return;
        }

        const newUser = await UserModel.create({ email, password });

        res.status(201);
        res.json({
            status: "success",
            message: "User created",
            data: {
                user: {
                    _id: newUser._id,
                    email: newUser.email,
                    isEmailVerified: newUser.isEmailVerified,
                },
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Something went wrong",
            data: error,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email);
        console.log(password);
        if (!password || !email) {
            res.status(400).json({
                status: "fail",
                message: "Please provide email and password",
                data: [],
            });
            return;
        }
        const user = await getUserByEmail(email);
        if (!user) {
            res.status(400).json({
                status: "fail",
                message: "User not found",
                data: [],
            });
            return;
        }

        const isCorrect = await user.verifyPassword(password, user.password);
        if (!isCorrect) {
            res.status(400).json({
                status: "Fail",
                message: "Invalid password",
                data: [],
            });
            return;
        }

        res.status(200).json({
            status: "success",
            data: {
                email: user.email,
                _id: user._id,
                name: user.name,
                isEmailVerified: user.isEmailVerified,
            },
            token: generateJWTToken({
                _id: user._id,
                email: user.email,
            })
        })

    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: "Something went wrong",
            data: err,
        });
    }
};

module.exports = {
    signup,
    login,
};
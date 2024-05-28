import catchAsyncError from "../../utils/middleware/catchAyncError.js";
import { userModel } from '../../../databases/models/user.model.js';
import AppError from "../../utils/services/AppError.js";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const signUp = catchAsyncError(async (req, res, next) => {
    let isFound = await userModel.findOne({ email: req.body.email });
    console.log(isFound);

    if (isFound) {
        return next(new AppError("Account Already Exists", 409));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({
            message: "fail",
            errors: {
                value: req.body.confirmPassword,
                msg: "Password confirmation is incorrect",
                param: "confirmPassword",
                location: "body"
            }
        });
    }

    let user = new userModel(req.body);
    await user.save();

    // res.status(201).json({
    //     status: "success",
    //     message: "User signed up successfully",
    //     data: {
    //         user
    //     }
    // });
// Generate a token for the new user
const token = jwt.sign({ userId: user._id, role: user.role }, 'yourSecretKey');
const response = {
    message: 'success',
    user: {
        name: user.name,
        email: user.email,
        role: user.role
    },
    token
};

res.json(response);
}

    )

    export const signIn = catchAsyncError(async (req, res, next) => {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
    
        if (!user) {
            return next(new AppError("Incorrect email or password", 401));
        }
    
        const match = await bcrypt.compare(password, user.password);
    
        if (!match) {
            return next(new AppError("Incorrect email or password", 401));
        }
    
        const token = jwt.sign({ name: user.name, email: user.email, role: user.role }, "mazen");
    
        return res.json({
            message: "success",
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });
    });


 
// 1- check we have token or not 
// 2- verfy token
// 3 if user of this token exist or not 
// 4- check if this token is the last one or not (change password )
export const protectRoutes = catchAsyncError(async (req, res, next) => {
    let { token } = req.headers;
    console.log(token);
    if (!token) return next(new AppError("please provide token", 401))
    
    let decoded = await jwt.verify(token, "mazen");


    let user = await userModel.findById(decoded.userId)
    if (!user) return next(new AppError("invalid user", 404));

    if (user.changePasswordAt) {
        let changePasswordTime = parseInt(user.changePasswordAt.getTime() / 1000);
        if (changePasswordTime > decoded.iat) return next(new AppError("  token invalid", 401));

    }


console.log(user);
    req.user = user;
    next()
}


     







)



export const allowTo = (...roles) => {
    return catchAsyncError((req, res, next) => {
        console.log(roles,req.user);
        if (!roles.includes(req.user.role)) return next(new AppError("not authirzed", 403))
        next()
    })

}  
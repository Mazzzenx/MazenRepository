import catchAsyncError from "../../utils/middleware/catchAyncError.js";
import { userModel } from '../../../databases/models/user.model.js';
import AppError from "../../utils/services/AppError.js";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
export const signUp =
    catchAsyncError(
    async (req, res, next) => {
    let isFound = await userModel.findOne({ email: req.body.email });
    console.log(isFound);
    if (isFound) next(new AppError("Email already exist", 409))
    let user = new userModel(req.body)
    await user.save()
    res.json({message:"added", user})
    }

    )

export const signIn = catchAsyncError(async (req, res, next) => {
    let { email, password } = req.body;
    let isFound = await userModel.findOne({ email });
    const match = await bcrypt.compare(password, isFound.password);

    if (isFound && match) {
        let token = jwt.sign({ name: isFound.name, userId: isFound._id, role: isFound.role }, "mazen")
        return res.json({message:"success", token})
    }   
  next(new AppError("incorrect email or password", 401))

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
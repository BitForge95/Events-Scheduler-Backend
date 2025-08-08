import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const authMiddleware = asyncHandler(async(req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, null, "Unauthorized: No token provided");
    }

    const token = authHeader.split(" ")[1];

    try {
        
        const decoded = jwt.verify(token,process.env.ACCESS_SECRET )

        const user = await User.findById(decoded.id).select("-password")

        if (!user) {
            throw new ApiError(401, null, "User not found");
        }

        req.user = user;

        next();


    } catch (error) {
        throw new ApiError(401, null, "Invalid or expired token");
    }
})

export {authMiddleware}
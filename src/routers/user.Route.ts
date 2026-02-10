import { Router } from "express";
import { editUserByUser, editUsersByAdmin, registerUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/jwtVerification.middleware.js";
export const userRouter:Router = Router();

userRouter.route('/').post(registerUser);
userRouter.route('/editAdmin').patch(editUsersByAdmin);
userRouter.route('/editUser').patch(verifyToken,editUserByUser);

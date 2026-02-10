import { Router } from "express";
import { deleteUser, editUserByUser, editUsersByAdmin, registerUser, viewUsers } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/jwtVerification.middleware.js";
export const userRouter:Router = Router();

userRouter.route('/').post(registerUser).get(viewUsers).delete(deleteUser);
userRouter.route('/editAdmin').patch(editUsersByAdmin);
userRouter.route('/editUser').patch(verifyToken,editUserByUser);

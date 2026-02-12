import { Router } from "express";
import { deleteUser, editUserByUser, editUsersByAdmin, registerUser, viewUsers } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/jwtVerification.middleware.js";
export const userRouter:Router = Router();

userRouter.route('/').post(registerUser).get(viewUsers);
userRouter.route('/editAdmin/:id').patch(editUsersByAdmin);
userRouter.route('/editUser').patch(verifyToken,editUserByUser);
userRouter.route('/deleteByUser').delete(verifyToken,deleteUser)

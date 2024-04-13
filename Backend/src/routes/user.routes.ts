import express from "express";
import { EditUser, logoutUser, registerUser, signInUser } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/authmiddleware";

const router = express.Router();
router.route('/register').post(registerUser);
router.route('/login').post(signInUser);
router.route('/logOut').post(authMiddleware, logoutUser)
router.route('/edit').put(authMiddleware, EditUser);

export default router;

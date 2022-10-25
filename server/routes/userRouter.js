import { Router } from "express";
import {
  deleteUser,
  getUsers,
  login,
  register,
  updateProfile,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const userRouter = Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.delete("/:userId", auth,deleteUser)
userRouter.patch("/updateProfile", auth, updateProfile);
userRouter.get("/", auth, getUsers);

export default userRouter;

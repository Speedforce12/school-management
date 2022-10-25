import { Router } from "express";
import {
  getStudents,
  updateStudent,
  deleteStudent,
  createStudent,
} from "../controllers/student.js";
import auth from "../middleware/auth.js";

const studentRouter = Router();
studentRouter.post("/", auth,createStudent);
studentRouter.get("/",auth, getStudents);
studentRouter.delete("/:studentId",auth, deleteStudent);
studentRouter.patch("/:studentId", auth, updateStudent);

export default studentRouter;


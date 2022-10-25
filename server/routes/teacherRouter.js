import { Router } from "express";
import {
  getTeachers,
  updateTeacher,
  createTeacher,
  deleteTeacher,
} from "../controllers/teacher.js";
import auth from "../middleware/auth.js";

const teacherRouter = Router();
teacherRouter.post("/", createTeacher);
teacherRouter.delete("/:teacherId", auth,deleteTeacher);
teacherRouter.get("/", auth, getTeachers);
teacherRouter.patch("/:teacherId", auth, updateTeacher);

export default teacherRouter;

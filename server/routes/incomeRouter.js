import { Router } from "express";
import {
  updateIncome,
  createIncome,
  deleteIncome,
  getIncomes,
} from "../controllers/income.js";
import auth from "../middleware/auth.js";

const incomeRouter = Router();

incomeRouter.post("/", auth,createIncome);
incomeRouter.get("/", auth, getIncomes);
incomeRouter.delete("/:id", auth, deleteIncome);
incomeRouter.patch("/:id", auth, updateIncome);

export default incomeRouter;

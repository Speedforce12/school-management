import { Router } from "express";
import {
  updateExpense,
  deleteExpense,
  createExpense,
  getExpenses,
} from "../controllers/expense.js";
import auth from "../middleware/auth.js";

const expenseRouter = new Router();

expenseRouter.get("/", auth, getExpenses);
expenseRouter.post("/", auth, createExpense);
expenseRouter.delete("/:id", auth, deleteExpense);
expenseRouter.patch("/:id", auth, updateExpense);

export default expenseRouter;

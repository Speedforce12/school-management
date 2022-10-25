import Expense from "../models/Expense.js";
import tryCatch from "../controllers/utils/tryCatch.js";

export const createExpense = tryCatch(async (req, res) => {
  const { expense, amount, date } = req.body;

  const newExpense = new Expense({
    ...req.body,
    expense,
    amount,
    date,
  });

  await newExpense.save();
  res.status(200).json({ success: true, result: newExpense });
});

// get all expenses from the database
export const getExpenses = tryCatch(async (req, res) => {
  const expenses = await Expense.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: expenses });
});

// delete income
export const deleteExpense = tryCatch(async (req, res) => {
  const { _id } = await Expense.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, result: { _id } });
});

// update expense details
export const updateExpense = tryCatch(async (req, res) => {
  const updatedExpense = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({ success: true, result: updatedExpense });
});

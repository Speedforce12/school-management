import Income from "../models/Income.js";
import tryCatch from "../controllers/utils/tryCatch.js";

export const createIncome = tryCatch(async (req, res) => {
  const { income, amount, date } = req.body;

  const newIncome = new Income({
    ...req.body,
    income,
    amount,
    date,
  });

  await newIncome.save();
  res.status(200).json({ success: true, result: newIncome });
});

// get all incomes from the database
export const getIncomes = tryCatch(async (req, res) => {
  const incomes = await Income.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: incomes });
});

// delete income
export const deleteIncome = tryCatch(async (req, res) => {
  const { _id } = await Income.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, result: { _id } });
});

// update income details
export const updateIncome = tryCatch(async (req, res) => {
  const updatedIncome = await Income.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({ success: true, result: updatedIncome });
});

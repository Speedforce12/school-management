import express from "express";
import dotenv from "dotenv";
import teacherRouter from "./routes/teacherRouter.js";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import studentRouter from "./routes/studentRouter.js";
import incomeRouter from "./routes/incomeRouter.js";
import expenseRouter from "./routes/expenseRouter.js";

dotenv.config();

const port = process.env.PORT || 3001;

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use("/user", userRouter);
app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);
app.use("/income", incomeRouter);
app.use("/expense", expenseRouter);
app.get("/", (req, res) => res.json({ message: "Welcome to our API" }));
app.use((req, res) =>
  res.status(404).json({ success: false, message: "Not Found" })
);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT);
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();

import mongoose from "mongoose";

const teacherSchema = mongoose.Schema(
  {
    firstName: { type: String, max: 80, required: true },
    lastName: { type: String, max: 80, required: true },
    address: { type: String, max: 80, required: false },
    gender: { type: String, max: 80, required: false },

    email: {
      type: String,
      min: 5,
      max: 50,
      required: true,
      unique: true,
      trim: true,
    },
    birth: { type: String, max: 80, required: false },

    qualification: { type: String, max: 10000, required: false },

    contact: { type: String, max: 80, required: true },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teachers", teacherSchema);

export default Teacher;

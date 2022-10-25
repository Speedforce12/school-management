import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    firstName: { type: String, max: 80, required: true },
    lastName: { type: String, max: 80, required: true },
    address: { type: String, max: 80, required: false },
    gender: { type: String, max: 80, required: true },

    parents: { type: String, max: 1000, required: false },

    contact: { type: String, max: 80, required: true },
    birth: { type: String, max: 80, required: true },
    medicals: { type: String, max: 10000, required: false },
    parent_job: { type: String, max: 200, required: false },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Students", studentSchema);
export default Teacher;

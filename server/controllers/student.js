import Student from "../models/Student.js"
import tryCatch from "./utils/tryCatch.js";

// create a new instance of the teacher
export const createStudent = tryCatch(async (req, res) => {
  const { firstName, lastName, address, contact, parents} =
    req.body;
  const student = new Student({
    ...req.body,
    firstName,
    lastName,
    address,
    contact,
    parents,
  });

  await student.save();
  res.status(200).json({ success: true, result: student });
});

// get list of teachers
export const getStudents = tryCatch(async (req, res) => {
  const students = await Student.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: students });
});

//delete a teacher from the database by its ID
export const deleteStudent = tryCatch(async (req, res) => {
  const { _id } = await Student.findByIdAndDelete(req.params.studentId);
  res.status(200).json({ success: true, result: { _id } });
});

// update teacher
export const updateStudent = tryCatch(async (req, res) => {
  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.studentId,
    req.body,
    { new: true }
  );
  res.status(200).json({ success: true, result: updatedStudent });
});
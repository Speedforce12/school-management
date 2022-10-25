import tryCatch from "./utils/tryCatch.js";
import Teacher from "../models/Teacher.js";

// create a new instance of the teacher
export const createTeacher = tryCatch(async (req, res) => {
  const {
    firstName,
    lastName,
    address,
    email,
    birth,
    gender,
    contact,
    qualification,
  } = req.body;
  const teacher = new Teacher({
    ...req.body,
    firstName,
    lastName,
    address,
    email,
    contact,
    qualification,
    gender,
    birth,
  });

  await teacher.save();
  res.status(200).json({ success: true, result: teacher });
});

// get list of teachers
export const getTeachers = tryCatch(async (req, res) => {
  const teachers = await Teacher.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: teachers });
});

//delete a teacher from the database by its ID
export const deleteTeacher = tryCatch(async (req, res) => {
  const { _id } = await Teacher.findByIdAndDelete(req.params.teacherId);
  res.status(200).json({ success: true, result: { _id } });
});

// update teacher
export const updateTeacher = tryCatch(async (req, res) => {
  const updatedTeacher = await Teacher.findByIdAndUpdate(
    req.params.teacherId,
    req.body,
    { new: true }
  );
  res.status(200).json({ success: true, result: updatedTeacher });
});

// export const getTeacher = tryCatch(async (req, res) => {
//   const editTeacher = await Teacher.findById(req.params.teacherId);
//   res.status(200).json({ success: true, result: editTeacher });
// });

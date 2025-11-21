const Student = require("../models/studentModel");

const user = require("../models/UserModel");
const studentquery = require("../services/studentQuery");

async function getByEmail(email) {
  return await user.findByPk(email);
}
async function getprofile(req, res) {
  const { email, role } = req.body;
  try {
    const newuser = await getByEmail(email).role;

    if (newuser.role !== role) {
      return res.status(402).json({
        success: false,
        message: "you are not authorized to see this profile",
      });
    }
    const data = await Student.findByPk(newuser.id);

    return res.status(200).json({
      success: true,
      message: "here is your  profile",
    });
  } catch (err) {
    console.log(`an eroor occured ${err.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
}

async function addStudent(req, res) {
  const id = req.user.id;
  try {
    const data = req.body;
    const existinguser = await user.findByPk(id);
    if (existinguser && existinguser.role == "student") {
      await Student.upsert(data);
      return res.status(200).json({
        success: true,
        message: "created your profile",
      });
    }
  } catch (err) {
    console.log(`an eroor occured ${err.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
}

const uploadStudentPhoto = async (req, res) => {
  try {
    const studentId = req.params.id;

    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // file path -> save in DB
    const filePath = req.file.path;

    const student = await studentService.getStudentById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await studentService.updateStudentPhoto(studentId, filePath);

    res.json({
      message: "Student photo uploaded successfully",
      photo: filePath,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getprofile, addStudent, uploadStudentPhoto };

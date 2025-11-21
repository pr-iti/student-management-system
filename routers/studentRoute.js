const { getprofile, addStudent } = require("../controllers/studentController");
const upload = require("../utils/multer");
const express = require("express");
const router = express.Router();

router.get("/profile", getprofile);
router.post("/add-information", addStudent);
router.post("/students/:id/photo", upload.single("photo"), uploadStudentPhoto);
module.exports = router;

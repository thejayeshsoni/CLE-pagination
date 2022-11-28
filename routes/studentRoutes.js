const router = require("express").Router();
const { addStudent, getAllStudents } = require("../controllers/studentController");


router.route("/addStudent").post(addStudent);
router.route("/student").get(getAllStudents);

module.exports = router;
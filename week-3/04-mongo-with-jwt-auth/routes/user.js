const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");
// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  try {
    const { username, password } = req.body;
    await User.create({
      username,
      password,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  try {
    const { username, password } = req.body;
    const user = await User.find({
      username,
      password,
    });
    if (!user) {
      return res.status(403).send("Forbidden");
    }
    const token = jwt.sign({ username, password }, "secret");
    res.status(200).json({ token });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find();
  res.status(200).json({ courses: courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const decoded = jwt.decode(req.headers.authorization.split(" ")[1]);
    const user = await User.updateOne(
      {
        username: decoded.username,
        password: decoded.password,
      },
      {
        $push: { courses: courseId },
      }
    );
    res.status(200).json({ message: "Course purchased successfully" });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
  const decoded = jwt.decode(req.headers.authorization.split(" ")[1]);
  const user = User.find({
    username: decoded.username,
    password: decoded.password,
  }).populate("courses");
  res.status(200).json({ courses: user.courses });
});

module.exports = router;

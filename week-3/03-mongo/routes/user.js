const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body;
  try {
    const newUser = await User.create({
      username,
      password,
    });
    res.status(200).json({ message: "User created successfully" });
  } catch (e) {
    console.log(e);
    return res.status(403).json({ error: "Invalid input" });
  }
});

router.get("/courses", userMiddleware, async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find();
  res.status(200).json({ courses: courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const { courseId } = req.params;
  const { username, password } = req.headers;
  const user = await User.findOne({
    username,
    password,
  })
    .populate("courses")
    .exec({ username, password });
  if (!user) {
    return res.status(403).json({ error: "Invalid input" });
  }
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(403).json({ error: "Invalid input" });
  }
  user.courses.push(course);
  await user.save();
  res.status(200).json({ message: "Course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const { username, password } = req.headers;
  const user = await User.findOne({
    username,
    password,
  })
    .populate("courses")
    .exec({ username, password });
  if (!user) {
    return res.status(403).json({ error: "Invalid input" });
  }
  res.status(200).json({ purchasedCourses: user.courses });
});

module.exports = router;

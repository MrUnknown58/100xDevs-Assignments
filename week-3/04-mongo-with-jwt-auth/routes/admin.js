const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  try {
    const { username, password } = req.body;
    await Admin.create({
      username,
      password,
    });
    res.status(201).json({ message: "Admin created successfully" });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  try {
    const { username, password } = req.body;
    const admin = await Admin.find({
      username,
      password,
    });
    if (!admin) {
      return res.status(403).send("Forbidden");
    }
    const token = jwt.sign({ username, password }, "secret");
    res.status(200).json({ token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  try {
    const { title, description, price, imageLink } = req.body;
    await Course.create({
      title,
      description,
      price,
      imageLink,
    });
    res.status(201).json({ message: "Course created successfully" });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const courses = await Course.find();
  res.status(200).json({ courses: courses });
});

module.exports = router;

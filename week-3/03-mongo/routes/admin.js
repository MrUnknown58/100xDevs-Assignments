const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const mongoose = require("mongoose");
const { Admin, Course } = require("../db");
// Admin Routes
// router.use(express.json());
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;
  // const validation = schema.safeParse(username, password);
  // if (!validation.success) {
  //   return res.status(403).json({ error: "Invalid input" });
  // }
  try {
    await Admin.create({
      username,
      password,
    });
    res.status(200).json({ message: "Admin created successfully" });
  } catch (e) {
    return res.status(403).json({ error: "Invalid input" });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  // const courseSchema = z.object({
  //   title: z.string(),
  //   description: z.string(),
  //   price: z.number(),
  //   imageLink: z.string(),
  // });
  // const validate = courseSchema.safeParse({
  //   title: req.body.title,
  //   description: req.body.description,
  //   price: req.body.price,
  //   imageLink: req.body.imageLink,
  // });
  // if (!validate.success) {
  //   return res.status(403).json({ error: "Invalid input" });
  // }
  try {
    const newCourse = await Course.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      imageLink: req.body.imageLink,
      published: false,
    });
    res.status(200).json({
      message: "Course created successfully",
      courseId: newCourse._id,
    });
  } catch (e) {
    return res.status(403).json({ error: "Invalid input" });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  try {
    const courses = await Course.find();
    console.log(courses);
    res.status(200).json({ courses: courses });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

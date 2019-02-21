const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await db("students");
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to retrieve student data"
    });
  }
});

// Get student by id
router.get("/:id", async (req, res) => {
  try {
    const student = await db("students")
      .where({ id: req.params.id })
      .first();
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({
        message: "The student with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to retrieve student data"
    });
  }
});

// Create new student
router.post("/", async (req, res) => {
  try {
    const [id] = await db("students").insert(req.body);
    const student = await db("students")
      .where({ id })
      .first();
    res.status(201).json({
      student,
      message: "Successfully created student data"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to create student data"
    });
  }
});

// Update existing student
router.put("/:id", async (req, res) => {
  try {
    const count = await db("students")
      .where({ id: req.params.id })
      .update(req.body);
    if (count > 0) {
      const student = await db("students")
        .where({ id: req.params.id })
        .first();
      res.status(200).json({
        student,
        message: "Successfully updated student data"
      });
    } else {
      res.status(404).json({
        message: "The student with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to update student data"
    });
  }
});

// Delete existing student
router.delete("/:id", async (req, res) => {
  try {
    const count = await db("students")
      .where({ id: req.params.id })
      .del();
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({
        message: "The student with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to delete student data"
    });
  }
});

module.exports = router;

const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

// Get all cohorts
router.get("/", async (req, res) => {
  try {
    const cohorts = await db("cohorts");
    res.status(200).json(cohorts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to retrieve cohort data"
    });
  }
});

// Get cohort by id
router.get("/:id", async (req, res) => {
  try {
    const cohort = await db("cohorts")
      .where({ id: req.params.id })
      .first();
    if (cohort) {
      res.status(200).json(cohort);
    } else {
      res.status(404).json({
        message: "The cohort with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to retrieve cohort data"
    });
  }
});

// Create new cohort
router.post("/", async (req, res) => {
  try {
    const [id] = await db("cohorts").insert(req.body);
    const cohort = await db("cohorts")
      .where({ id })
      .first();
    res.status(201).json({
      cohort,
      message: "Successfully created cohort data"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to create cohort data"
    });
  }
});

// Update existing cohort
router.put("/:id", async (req, res) => {
  try {
    const count = await db("cohorts")
      .where({ id: req.params.id })
      .update(req.body);
    if (count > 0) {
      const cohort = await db("cohorts")
        .where({ id: req.params.id })
        .first();
      res.status(200).json({
        cohort,
        message: "Successfully updated cohort data"
      });
    } else {
      res.status(404).json({
        message: "The cohort with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to update cohort data"
    });
  }
});

// Delete existing cohort
router.delete("/:id", async (req, res) => {
  try {
    const count = await db("cohorts")
      .where({ id: req.params.id })
      .del();
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({
        message: "The cohort with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to delete cohort data"
    });
  }
});

module.exports = router;

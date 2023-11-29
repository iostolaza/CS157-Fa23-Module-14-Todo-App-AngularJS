const express = require("express");
const Todo = require("../models/todo.js");
const authUser = require("../middleware/authUser.js");
const adminRole = require("../middleware/adminRole.js");

const router = express.Router();

// The 4 CRUD operations for this task app (Create, Read, Update, Delete) => (POST, GET, PATCH, DELETE)

// GET (Read All tasks)
// GET /api/todos/?filter={"task":"study"}&select={"task":1}&sort={"task":1}&skip=10&limit=10
router.get("/", authUser, (req, res) => {

  if (req.query.filter) {
    req.query.filter = JSON.parse(req.query.filter);
  }

  if (req.query.select) {
    req.query.select = JSON.parse(req.query.select);
  }

  if (req.query.sort) {
    req.query.sort = JSON.parse(req.query.sort);
  }

  let skip;
  if (req.query.skip) {
    skip = parseInt(req.query.skip);
  }

  let limit
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }


  Todo.find(req.query.filter)
      .select(req.query.select)
      .sort(req.query.sort)
      .skip(skip)
      .limit(limit)
    .exec()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    })
})


// GET (Read One task by id)
router.get("/:id", authUser, (req, res) => {
  Todo.findById(req.params.id)
    .then(result => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("Not found!");
      }
    })
    .catch(err => {
      res.status(400).send(err);
    })
})


// POST (Create new task)
router.post("/", authUser, (req, res) => {
  let newTask = new Todo(req.body);

  newTask.save()
    .then(result => {
      res.status(201).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    })
})


// PATCH (Update a task)
router.patch("/:id", authUser, (req, res) => {
  Todo.findByIdAndUpdate(
    req.params.id, // The id of the document we want to update
    req.body, // The object that contains the changes
    {
      new: true, // return the updated object
      runValidators: true // make sure the updates are validated against the schema
    })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    })
})


// DELETE (Delete a task)
router.delete("/:id", authUser, (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    })
})

module.exports = router;
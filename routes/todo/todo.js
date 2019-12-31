const express = require("express");
const router = express.Router();
const { Todo } = require("../../models/todo");
// allTodo
router.get("/", async (req, res) => {
  const result = await Todo.find();
  res.status(200).json({
    message: "All Todo",
    data: result
  });
});

// createTodo
router.post("/", async (req, res) => {
  if (!req.body.hasOwnProperty("title")) {
    return res.status(400).json({
      message: "Enter Title Please"
    });
  }
  let obj = new Todo({
    title: req.body.title || "empty"
  });

  let result = await obj.save();

  res.status(200).json({
    message: "Successfully Created Todo",
    data: result
  });
});

// getSingleTodo
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let result = await Todo.findById(id);
    if (!result)
      return res.status(404).json({
        message: "Todo Not Found "
      });
    res.status(200).json({
      message: "get Single Todo",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      message: "Todo Not Found with Bad Request"
    });
  }
});

// updateSingleTodo
router.put("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let todo = await Todo.findById(id);
    if (!todo)
      return res.status(404).json({
        message: "Todo Not Found "
      });

    todo.title = "title" in req.body ? req.body.title : todo.title;

    const result = await todo.save();
    res.status(200).json({
      message: "Updated Single Todo",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      message: "Todo Not Found with Bad Request"
    });
  }
});

// deleteSingleTodo
router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let todo = await Todo.findById(id);
    if (!todo)
      return res.status(404).json({
        message: "Todo Not Found "
      });
    const result = await Todo.findByIdAndRemove(id);
    if (result) {
      res.status(200).json({
        message: "Successfully Deleted",
        data: result
      });
    } else {
      res.status(500).json({
        message: "Server Error"
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Todo Not Found with Bad Request"
    });
  }
});

module.exports = router;

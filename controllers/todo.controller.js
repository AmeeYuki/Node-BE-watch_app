const Todo = require("../models/todo.model");

class toDoController {
  // Get all todos
  getTodos(req, res) {
    Todo.find()
      .then((todos) => res.json(todos))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  // Add new todo
  addTodo(req, res) {
    const todo = req.body.todo;
    const newTodo = new Todo({ todo });

    newTodo
      .save()
      .then(() => res.json("Todo added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  }
}
module.exports = new toDoController();

const router = require("express").Router();
const toDoController = require("../controllers/todo.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - todo
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the todo
 *         todo:
 *           type: string
 *           description: The todo item
 *       example:
 *         _id: d5fE_asz
 *         todo: Buy groceries
 */

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: The todos managing API
 */

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Returns the list of all the todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: The list of the todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.route("/").get(toDoController.getTodos);

/**
 * @swagger
 * /todos/add:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: The todo was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Some error happened
 */
router.route("/add").post(toDoController.addTodo);

module.exports = router;

const router = require("express").Router();
const commentController = require("../controllers/comment.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - rating
 *         - content
 *         - author
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the comment
 *         rating:
 *           type: number
 *           description: The rating of the comment
 *           minimum: 1
 *           maximum: 3
 *         content:
 *           type: string
 *           description: The content of the comment
 *         author:
 *           type: string
 *           description: The author of the comment (refers to Member)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the comment was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the comment was last updated
 *       example:
 *         _id: d5fE_asz
 *         rating: 2
 *         content: This is a comment
 *         author: 60d0fe4f5311236168a109ca
 *         createdAt: 2021-06-22T14:38:00.000Z
 *         updatedAt: 2021-06-22T14:38:00.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: The comments managing API
 */

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Returns the list of all the comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: The list of the comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
router.get("/", commentController.getComments);

/**
 * @swagger
 * /comments/add:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: The comment was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Some error happened
 */
router.post("/add", commentController.addComment);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get the comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *     responses:
 *       200:
 *         description: The comment description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Some error happened
 *       404:
 *         description: The comment was not found
 */
router.get("/:id", commentController.getCommentById);

/**
 * @swagger
 * /comments/update/{id}:
 *   put:
 *     summary: Update the comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: The comment was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Some error happened
 *       404:
 *         description: The comment was not found
 */
router.put("/update/:id", commentController.updateComment);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Remove the comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *     responses:
 *       200:
 *         description: The comment was deleted
 *       400:
 *         description: Some error happened
 *       404:
 *         description: The comment was not found
 */
router.delete("/:id", commentController.deleteComment);

module.exports = router;

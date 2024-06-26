const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const commentController = require("../controllers/comment.controller");

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API to manage comments
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - rating
 *         - content
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the comment
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 3
 *           description: The rating of the comment (between 1 and 3)
 *         content:
 *           type: string
 *           description: The content of the comment
 *         author:
 *           type: string
 *           description: The id of the author who created the comment
 *       example:
 *         rating: 3
 *         content: "This is a great product!"
 *         author: "6123456789abcdef01234567"
 */

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: The updated comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Failed to update the comment
 *       403:
 *         description: Unauthorized, only the author can update the comment
 *       404:
 *         description: Comment not found
 */
router.put("/:id", auth(), commentController.updateComment);

module.exports = router;

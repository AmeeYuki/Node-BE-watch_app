const router = require("express").Router();
const watchController = require("../controllers/watch.controller");
const auth = require("../middleware/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Watch:
 *       type: object
 *       required:
 *         - watchName
 *         - image
 *         - price
 *         - watchDescription
 *         - brand
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the watch
 *         watchName:
 *           type: string
 *           description: The name of the watch
 *         image:
 *           type: string
 *           description: The image URL of the watch
 *         price:
 *           type: number
 *           description: The price of the watch
 *         automatic:
 *           type: boolean
 *           description: Whether the watch is automatic
 *         watchDescription:
 *           type: string
 *           description: The description of the watch
 *         comments:
 *           type: array
 *           items:
 *             type: string
 *             description: The ID of the comment
 *         brand:
 *           type: string
 *           description: The ID of the brand
 *       example:
 *         watchName: Rolex Submariner
 *         image: http://example.com/image.jpg
 *         price: 15000
 *         automatic: true
 *         watchDescription: A luxury diving watch
 *         brand: 60d21b4667d0d8992e610c85
 */

/**
 * @swagger
 * tags:
 *   name: Watches
 *   description: The watches managing API
 */

/**
 * @swagger
 * /watches:
 *   get:
 *     summary: Returns the list of all the watches
 *     tags: [Watches]
 *     responses:
 *       200:
 *         description: The list of the watches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Watch'
 */
router.get("/", watchController.getWatches);

/**
 * @swagger
 * /watches/{id}:
 *   get:
 *     summary: Get the watch by ID
 *     tags: [Watches]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The watch id
 *     responses:
 *       200:
 *         description: The watch description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Watch'
 *       400:
 *         description: Some error happened
 *       404:
 *         description: The watch was not found
 */
router.get("/:id", watchController.getWatchById);

/**
 * @swagger
 * /watches/add:
 *   post:
 *     summary: Create a new watch
 *     tags: [Watches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Watch'
 *     responses:
 *       201:
 *         description: The watch was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Watch'
 *       400:
 *         description: Some error happened
 */
router.post("/add", auth("admin"), watchController.createWatch);

/**
 * @swagger
 * /watches/update/{id}:
 *   put:
 *     summary: Update the watch by ID
 *     tags: [Watches]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The watch id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Watch'
 *     responses:
 *       200:
 *         description: The watch was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Watch'
 *       400:
 *         description: Some error happened
 *       404:
 *         description: The watch was not found
 */
router.put("/update/:id", auth("admin"), watchController.updateWatch);

/**
 * @swagger
 * /watches/{id}:
 *   delete:
 *     summary: Remove the watch by ID
 *     tags: [Watches]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The watch id
 *     responses:
 *       200:
 *         description: The watch was deleted
 *       400:
 *         description: Some error happened
 *       404:
 *         description: The watch was not found
 */
router.delete("/:id", auth("admin"), watchController.deleteWatch);

module.exports = router;

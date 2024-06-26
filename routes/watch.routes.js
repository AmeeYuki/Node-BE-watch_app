const router = require("express").Router();
const watchController = require("../controllers/watch.controller");

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
 *         Automatic:
 *           type: boolean
 *           description: Whether the watch is automatic
 *         watchDescription:
 *           type: string
 *           description: The description of the watch
 *         comments:
 *           type: array
 *           items:
 *             type: string
 *             description: The comment IDs related to the watch
 *         brand:
 *           type: string
 *           description: The brand ID of the watch
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the watch was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the watch was last updated
 *       example:
 *         _id: d5fE_asz
 *         watchName: Rolex Submariner
 *         image: http://example.com/rolex.jpg
 *         price: 15000
 *         Automatic: true
 *         watchDescription: This is a luxury watch.
 *         comments: [d5fE_asz, f9fE_asz]
 *         brand: d5fE_asz
 *         createdAt: 2021-06-22T14:38:00.000Z
 *         updatedAt: 2021-06-22T14:38:00.000Z
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
 *       200:
 *         description: The watch was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Watch'
 *       400:
 *         description: Some error happened
 */
router.post("/add", watchController.addWatch);

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
router.put("/update/:id", watchController.updateWatch);

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
router.delete("/:id", watchController.deleteWatch);

module.exports = router;

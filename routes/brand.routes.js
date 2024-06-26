const router = require("express").Router();
const brandController = require("../controllers/brand.controller");
const auth = require("../middleware/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       required:
 *         - brandName
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the brand
 *         brandName:
 *           type: string
 *           description: The name of the brand
 *       example:
 *         brandName: Nike
 */

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: The brands managing API
 */

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Returns the list of all the brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: The list of the brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 */
router.get("/", brandController.getAllBrands);

/**
 * @swagger
 * /brands/add:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *     responses:
 *       201:
 *         description: The brand was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       400:
 *         description: Some error happened
 */
router.post("/add", auth("admin"), brandController.createBrand);

// /**
//  * @swagger
//  * /brands/{id}:
//  *   get:
//  *     summary: Get the brand by ID
//  *     tags: [Brands]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The brand id
//  *     responses:
//  *       200:
//  *         description: The brand description by ID
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Brand'
//  *       400:
//  *         description: Some error happened
//  *       404:
//  *         description: The brand was not found
//  */
// router.get("/:id", brandController.getBrandById);

/**
 * @swagger
 * /brands/update/{id}:
 *   put:
 *     summary: Update the brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The brand id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *     responses:
 *       200:
 *         description: The brand was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       400:
 *         description: Some error happened
 *       404:
 *         description: The brand was not found
 */
router.put("/update/:id", auth("admin"), brandController.updateBrand);

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Remove the brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The brand id
 *     responses:
 *       200:
 *         description: The brand was deleted
 *       400:
 *         description: Some error happened
 *       404:
 *         description: The brand was not found
 */
router.delete("/:id", auth("admin"), brandController.deleteBrand);

module.exports = router;

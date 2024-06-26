const router = require("express").Router();
const memberController = require("../controllers/member.controller");
const auth = require("../middleware/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       required:
 *         - memberName
 *         - password
 *         - name
 *         - yob
 *         - isAdmin
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the member
 *         memberName:
 *           type: string
 *           description: The username of the member
 *         password:
 *           type: string
 *           description: The password of the member
 *         name:
 *           type: string
 *           description: The full name of the member
 *         yob:
 *           type: number
 *           description: The year of birth of the member
 *         isAdmin:
 *           type: boolean
 *           description: Whether the member is an admin
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the member was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the member was last updated
 *       example:
 *         memberName: string
 *         password: string
 *         name: string
 *         yob: 2003
 */

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: The members managing API
 */

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Returns the list of all the members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: The list of the members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 */
router.get("/", auth, memberController.getMembers);

/**
 * @swagger
 * /members/register:
 *   post:
 *     summary: Register a new member
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Member'
 *     responses:
 *       200:
 *         description: The member was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       400:
 *         description: Some error happened
 */
router.post("/register", memberController.register);

/**
 * @swagger
 * /members/login:
 *   post:
 *     summary: Login a member
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - memberName
 *               - password
 *             properties:
 *               memberName:
 *                 type: string
 *                 description: The member's username
 *               password:
 *                 type: string
 *                 description: The member's password
 *             example:
 *               memberName: john_doe
 *               password: password123
 *     responses:
 *       200:
 *         description: The member was successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token
 *       400:
 *         description: Some error happened
 */
router.post("/login", memberController.login);

// /**
//  * @swagger
//  * /members/add:
//  *   post:
//  *     summary: Create a new member
//  *     tags: [Members]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Member'
//  *     responses:
//  *       200:
//  *         description: The member was successfully created
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Member'
//  *       400:
//  *         description: Some error happened
//  */
// router.post("/add", memberController.addMember);

// /**
//  * @swagger
//  * /members/{id}:
//  *   get:
//  *     summary: Get the member by ID
//  *     tags: [Members]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The member id
//  *     responses:
//  *       200:
//  *         description: The member description by ID
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Member'
//  *       400:
//  *         description: Some error happened
//  *       404:
//  *         description: The member was not found
//  */
// router.get("/:id", memberController.getMemberById);

// /**
//  * @swagger
//  * /members/update/{id}:
//  *   put:
//  *     summary: Update the member by ID
//  *     tags: [Members]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The member id
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Member'
//  *     responses:
//  *       200:
//  *         description: The member was updated
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Member'
//  *       400:
//  *         description: Some error happened
//  *       404:
//  *         description: The member was not found
//  */
// router.put("/update/:id", memberController.updateMember);

// /**
//  * @swagger
//  * /members/{id}:
//  *   delete:
//  *     summary: Remove the member by ID
//  *     tags: [Members]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The member id
//  *     responses:
//  *       200:
//  *         description: The member was deleted
//  *       400:
//  *         description: Some error happened
//  *       404:
//  *         description: The member was not found
//  */
// router.delete("/:id", memberController.deleteMember);

module.exports = router;

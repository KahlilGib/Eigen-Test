const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();

/**
 * @swagger
 * /borrow:
 *   post:
 *     summary: Borrow a book
 *     requestBody:
 *       required:
 *         - memberCode
 *         - bookCode
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *               bookCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       400:
 *         description: Bad Request
 */
router.post('/borrow', Controller.borrow);

/**
 * @swagger
 * /return:
 *   post:
 *     summary: Return a book
 *     requestBody:
 *       required:
 *         - memberCode
 *         - bookCode
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *               bookCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: Bad Request
 */
router.post('/return', Controller.return);

/**
 * @swagger
 * /check/book:
 *   get:
 *     summary: Check available books
 *     responses:
 *       200:
 *         description: List of available books
 *       400:
 *         description: Bad Request
 */
router.get('/check/book', Controller.checkBook);

/**
 * @swagger
 * /check/member:
 *   get:
 *     summary: Check member information
 *     responses:
 *       200:
 *         description: List of members
 *       400:
 *         description: Bad Request
 */
router.get('/check/member', Controller.checkMember);

module.exports = router;
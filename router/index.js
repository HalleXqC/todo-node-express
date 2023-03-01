const Router = require('express').Router
const router = new Router()
const userRouter = require('./userRouter')
const todoRouter = require('./todoRouter')
const authMiddleware = require('../middlewares/authMiddleware')

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/models/models.js/User'
 */

router.use('/user', userRouter)
router.use('/todo', authMiddleware, todoRouter)

module.exports = router
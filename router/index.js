const Router = require('express').Router
const router = new Router()
const userRouter = require('./userRouter')
const todoRouter = require('./todoRouter')
const authMiddleware = require('../middlewares/authMiddleware')

router.use('/user', userRouter)
router.use('/todo', authMiddleware , todoRouter)

module.exports = router
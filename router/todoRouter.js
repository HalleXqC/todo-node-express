const Router = require('express').Router
const router = new Router()
const todoController = require('../controllers/todoController')
const { body } = require('express-validator')

router.post(
    '/create',
    body('title')
        .exists().withMessage('Title is required')
        .isLength({max: 254}).withMessage('Title length must be lower than 255 characters'),
    todoController.create
)
router.patch('/:id', todoController.changePatch)
router.put('/:id', todoController.changePut)
router.delete('/:id', todoController.delete)
router.get('/', todoController.getAll)
router.get('/:id', todoController.getOne)

module.exports = router
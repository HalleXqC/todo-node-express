const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/apiError')
const TodoService = require('../services/todoService')

class TodoController {
    async create(req, res, next) {
        try {
            const validateErrors = validationResult(req)
            if (!validateErrors.isEmpty()) {
                return next(ApiError.BadRequest('Validation Error', validateErrors.array()))
            }
            const { id } = req.user
            const { title, description } = req.body
            const todo = await TodoService.create(title, description, id)
            return res.json(todo)
        } catch (e) {
            next(e)
        }
    }

    async changePatch(req, res, next) {
        try {
            const { id } = req.user
            const updatedTodo = await TodoService.changePatch(req.body, req.params.id, id)
            return res.json(updatedTodo)
        } catch (e) {
            next(e)
        }
    }

    async changePut(req, res, next) {
        try {
            const { id } = req.user
            const updatedTodo = await TodoService.changePatch(req.body, req.params.id, id)
            return res.json(updatedTodo)
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const { id } = req.user
            const todos = await TodoService.getAll(id)
            return res.json(todos)
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.user
            const todo = await TodoService.getOne(req.params.id, id)
            return res.json(todo)
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.user
            const todo = await TodoService.delete(req.params.id, id)
            return res.json(todo)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new TodoController()
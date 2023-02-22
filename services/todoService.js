const ApiError = require('../exceptions/apiError')
const { Todo } = require('../models/models')


class TodoService {
    async create(title, description = '', userId) {
        const todo = await Todo.create({
            title,
            description,
            userId
        })

        return todo
    }

    async changePatch(body, todoId, userId) {
        const todo = await Todo.findOne({ where: { id: todoId } })
        if (!todo) {
            throw ApiError.BadRequest('Todo with given id is not defined')
        }
        if (todo.dataValues.userId != userId) {
            throw ApiError.BadRequest("You cannot change some other guy's todos, only yours")
        }

        if (!body.title && !body.description) {
            throw ApiError.BadRequest("Title or description is required")
        }

        if (body.title && body.title?.length > 254) {
            throw ApiError.BadRequest("Title must contain less than 255 characters!")
        }

        if (body.description && body.description?.length > 254) {
            throw ApiError.BadRequest("Description must contain less than 255 characters!")
        }

        body.title && await todo.update({ title: body.title })
        body.description && await todo.update({ description: body.description })

        return todo

    }

    async changePut(body, todoId, userId) {
        const todo = await Todo.findOne({ where: { id: todoId } })
        if (!todo) {
            throw ApiError.BadRequest('Todo with given id is not defined')
        }

        if (todo.userId != userId) {
            throw ApiError.BadRequest("You cannot change some other guy's todos, only yours")
        }

        if (!body.title && !body.description) {
            throw ApiError.BadRequest("Title or description is required")
        }

        if (body.title && body.title?.length > 254) {
            throw ApiError.BadRequest("Title must contain less than 255 characters!")
        }

        if (body.description && body.description?.length > 254) {
            throw ApiError.BadRequest("Description must contain less than 255 characters!")
        }

        body.title && await todo.update({ title: body.title })
        body.description && await todo.update({ description: body.description })

        return todo
    }

    async getAll(userId) {
        const todos = await Todo.findAll({ where: { userId } })
        return todos
    }

    async getOne(todoId, userId) {
        const todo = await Todo.findOne({ where: { id: todoId } })
        if (!todo) {
            throw ApiError.BadRequest('Todo with given id is not defined')
        }

        if(todo.dataValues.userId != userId) {
            throw ApiError.BadRequest("You cannot watch some other guy's todos!")
        }

        return todo
    }

    async delete(todoId, userId) {
        const todo = await Todo.findOne({ where: { id: todoId } })
        if (!todo) {
            throw ApiError.BadRequest('Todo with given id is not defined')
        }

        if(todo.dataValues.userId != userId) {
            throw ApiError.BadRequest("You cannot delete some other guy's todos!")
        }

        await todo.destroy()

        return todo
    }
}

module.exports = new TodoService()
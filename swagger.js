const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Itacademy TODO API',
      version: '1.0.0',
      description: 'API documentation for Your API',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      },
      contact: {
        name: 'Itacademy',
        email: 'Ololohaus'
      }
    },
    servers: [
      {
        url: 'https://itacdemy-todo-node.onrender.com'
      }
    ]
  },
  apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJsDoc(options)

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
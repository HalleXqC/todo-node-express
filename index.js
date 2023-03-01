require('dotenv').config()
const express = require('express')
const cors = require('cors')

const sequelize = require('./db')
const models = require('./models/models')
const errorMiddleware = require('./middlewares/errorMiddleware')
const router = require('./router/index')

const app = express()
const PORT = process.env.PORT || 5000

require('./swagger')(app)

app.use(express.json())
app.use(cors())
app.use('/api', router)
app.use(errorMiddleware)


const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('Server has successfully started on port ' + PORT))
    } catch(e) {
        console.log(e)
    }
}

start()
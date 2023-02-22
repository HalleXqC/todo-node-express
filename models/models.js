const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
})

const Todo = sequelize.define('todo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, defaultValue: ''},
    completed: {type: DataTypes.BOOLEAN, defaultValue: false}
})

const Token = sequelize.define('token', {
    refreshToken: {type: DataTypes.STRING(3000), allowNull: false}
})



User.hasMany(Todo)
Todo.belongsTo(User)

User.hasOne(Token)
Token.belongsTo(User)


module.exports = {
    User,
    Todo,
    Token,
}
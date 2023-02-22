const { Sequelize } = require('sequelize')

// module.exports = new Sequelize(
//     process.env.DB_NAME,   
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         dialect: 'postgres',
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//     }
// )

module.exports = new Sequelize('postgres://scintilla:J7jURiU8Ku8va8iedn3zQBIayBC6UImV@dpg-cfr133hgp3joa8hgjel0-a/todo_xcia')
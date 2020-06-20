const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
//资源引入区
const config = require("./setting.json")
//中间件使用区
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
//路由模块区

require('./routes/v1')(app)
//封装模式
const TodoModel = require('./db/models/todo')
const UserModel = require('./db/models/user')

//开启服务
app.get('/', async (req, res, next) => {
    // const user1 = await UserModel.create({ username: "coser", password: "123" })
    const todos = await TodoModel.findAll()
    const users = await UserModel.findAll()
    res.send({
        code: 200,
        msg: "后端接口正在为您服务",
        todos, users, user1
    })
})
//开发模式
app.listen(config.development.PORT, (req, res, next) => {
    console.log(`http://${config.development.HOST}:${config.development.PORT}`)
})
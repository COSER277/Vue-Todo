module.exports = app => {
    //数据模型
    //sequelize 集成模式
    const models = require('../../database/models/index')
    const express = require('express')
    const Router = express.Router();
    app.use('/api/v1/todo', Router)
    /*--------------------------------------//错误处理函数---------------------------------------------------------*/
    app.use(async (err, req, res, next) => {
        if (err) {
            res.status(err.statusCode || 500).send({
                msg: err.message
            })
        }

    })
    //获取对象列表
    Router.get('/list/:status/:page', async (req, res, next) => {
        try {
            let { status, page } = req.params
            //status:0为待办 1为完成 -1为删除 101为全部
            //page:0,....
            let limit = 10 //每页10条
            let offset = (page - 1) * limit //偏移量 计算从第几条开始 如page=1 则offset=0-10 如page=2 则offset=10-20
            let where = {}
            if (status != 101) {
                where.status = status
            }
            const todos = await models.Todo.findAndCountAll({
                where,
                limit,
                offset
            })
            res.status(200).send({
                code: 200,
                msg: "获取成功！",
                todos
            })
        } catch (error) {
            next(error)//传递下去路由 到错误处理函数 抛出给客户端异常
        }
    })
    //创建对象
    Router.post('/create', async (req, res, next) => {
        try {
            let { title, deadline, content, status } = req.body
            if (!title) {
                return res.status(501).send({
                    code: 501,
                    msg: "标题不能为空"
                })
            }
            if (!status) {
                status = 0
            }
            const todo = await models.Todo.create({ title, deadline, content, status })
            res.status(200).send({
                code: 200,
                msg: "添加成功！",
                todo
            })
        } catch (error) {
            next(error)//传递下去路由 到错误处理函数 抛出给客户端异常
        }
    })
    //获取对象
    Router.post('/edit/:id', async (req, res, next) => {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(501).send({
                    code: 501,
                    msg: "参数不能为空"
                })
            }
            const todo = await models.Todo.findOne({ id: id })
            res.status(200).send({
                code: 200,
                msg: "获取成功！",
                todo
            })
        } catch (error) {
            next(error)//传递下去路由 到错误处理函数 抛出给客户端异常
        }
    })
    //删除对象
    Router.delete('/delete/:id', async (req, res, next) => {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(501).send({
                    code: 501,
                    msg: "参数不能为空"
                })
            }
            const todo_ok = await models.Todo.findOne({ id: id })
            if (!todo_ok) {
                return res.status(501).send({
                    code: 501,
                    msg: "任务不存在"
                })
            }
            const todo = await todo_ok.destroy()
            res.status(200).send({
                code: 200,
                msg: "删除成功！",
                todo
            })
        } catch (error) {
            next(error)//传递下去路由 到错误处理函数 抛出给客户端异常
        }
    })
    //修改对象
    Router.post('/update', async (req, res, next) => {
        try {
            const body = req.body//获取参数
            if (!body) {
                return res.status(501).send({
                    code: 501,
                    msg: "参数不能为空"
                })
            }
            const todo_ok = await models.Todo.findOne({ where: { id: body.id } })
            if (!todo_ok) {
                return res.status(501).send({
                    code: 501,
                    msg: "任务不存在"
                })
            }
            // body.deadline = new Date()
            const todo = await todo_ok.update({
                title: body.title,
                content: body.content,
                deadline: body.deadline
            })
            res.status(200).send({
                code: 200,
                msg: "修改成功！",
                todo
            })

        } catch (error) {
            next(error)//传递下去路由 到错误处理函数 抛出给客户端异常
        }
    })
    //修改状态属性
    Router.post('/update_status/:id/:status', async (req, res, next) => {
        try {
            let id = req.params.id
            let status = req.params.status
            if (!id || !status) {
                return res.status(501).send({
                    code: 501,
                    msg: "参数不能为空"
                })
            }
            const todo_ok = await models.Todo.findOne({ where: { id: id } })
            if (!todo_ok) {
                return res.status(501).send({
                    code: 501,
                    msg: "任务不存在"
                })
            }
            // body.deadline = new Date()

            const todo = await todo_ok.update({
                status: status,
                // deadline: body.deadline
            })
            res.status(200).send({
                code: 200,
                msg: "修改成功！",
                todo
            })
        } catch (error) {
            next(error)//传递下去路由 到错误处理函数 抛出给客户端异常
        }
    })
}

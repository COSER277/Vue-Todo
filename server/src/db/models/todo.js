var Sequelize = require('sequelize');
var db = require('../index');

var Todo = db.defineModel('Todo', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    title: Sequelize.STRING(100),          // 标题
    content: Sequelize.STRING(500),        // 详细内容
    priority: Sequelize.INTEGER,          // 级别
    startDate: Sequelize.STRING,         // 开始时间
    planFinishDate: Sequelize.STRING,     // 计划完成时间
    realFinishDate: Sequelize.STRING,     // 实际完成时间
    bz: Sequelize.STRING(500),               // 备注
    state: Sequelize.INTEGER,            // 状态
}, {
    timestamps: true               // 不要默认时间戳
});

module.exports = Todo;
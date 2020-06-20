var Sequelize = require('sequelize');
var db = require('../index');

var User = db.defineModel('User', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },          // 用户名
    password: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },            // 密码
    avastar: Sequelize.STRING(500),         // 头像地址
}, {
    timestamps: true               // 默认时间戳
});

module.exports = User;
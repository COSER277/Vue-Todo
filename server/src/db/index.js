var Sequelize = require('sequelize');
// 数据库配置文件
var sqlConfig = {
    host: "localhost",
    user: "root",
    password: "123",
    database: "todo_test"
};
var sequelize = new Sequelize(sqlConfig.database, sqlConfig.user, sqlConfig.password, {
    host: sqlConfig.host,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    },
    timezone: '+08:00', //东八时区
    // 是否同步
    sync: { force: true },
});
sequelize.authenticate().then(() => {
    console.log("数据库连接成功...")
}).catch(err => {
    console.log("数据库连接失败..." + err)
})

exports.sequelize = sequelize;

//封装模型定义方法 ---name-模型名 attributes-字段
exports.defineModel = function (name, attributes) {
    var attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                // allowNull: false
            };
        }
    }
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: true,
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        hooks: {
            beforeBulkCreate: function (obj) {
                obj.version = 0;
            },
            beforeValidate: function (obj) {
                if (obj.isNewRecord) {
                    console.log('first');
                    obj.version = 0;
                } else {
                    console.log('not first');
                    obj.version = obj.version + 1;
                }
            }
        }
    });
};
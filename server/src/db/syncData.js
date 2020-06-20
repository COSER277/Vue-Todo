/**
 * 批量同步数据脚本
 * */
var sequelize = require('./index').sequelize;
var fs = require('fs');
var files = fs.readdirSync(__dirname + '/models');
var js_files = files.filter((f) => {
    return f.endsWith('.js');
}, files);
console.log(js_files);
module.exports = {};
for (var f of js_files) {
    console.log(`import model from file ${f}...`);
    var name = f.substring(0, f.length - 3);
    module.exports[name] = require(__dirname + '/models/' + f);
}
sequelize.sync();
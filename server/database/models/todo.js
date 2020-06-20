'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    status: DataTypes.INTEGER,
    deadline: DataTypes.DATE
  }, {
    timestamps: false//时间戳
  });
  Todo.associate = function (models) {
    // associations can be defined here
  };

  return Todo;
};
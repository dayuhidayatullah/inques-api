"use strict";
const { Model, DATE, Table } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      email_verified_at: DataTypes.DATE,
      password: DataTypes.STRING,
      remember_token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
      underscored: true,
      // tableName: "users",
    }
  );
  return Users;
};

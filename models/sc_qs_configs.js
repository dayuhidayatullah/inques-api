"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sc_qs_configs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sc_qs_configs.init(
    {
      szQuestionId: { type: DataTypes.STRING, primaryKey: true },
      szTrnId: DataTypes.STRING,
      szIntroduction: DataTypes.STRING,
      szInstruction: DataTypes.STRING,
      szColorId: DataTypes.STRING,
      szIssue: DataTypes.STRING,
      szValidation: DataTypes.STRING,
      szUserClass: DataTypes.STRING,
      bMode: DataTypes.TINYINT,
      szClosingNote: DataTypes.STRING,
      imgIcon: DataTypes.BLOB,
      bShowResult: DataTypes.TINYINT,
      szDashboardNote: DataTypes.STRING,
      szIconPath: DataTypes.STRING,
      bAllowUpdate: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: "sc_qs_configs",
      timestamps: false,
    }
  );
  return sc_qs_configs;
};

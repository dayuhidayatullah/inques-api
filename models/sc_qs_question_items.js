"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class sc_qs_question_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.sc_qs_config, { foreignKey: "szQuestionId" });
      this.belongsTo(models.sc_qs_questions, {foreignKey: 'szQuestionId', as: 'question'})
      this.hasOne(models.sc_qs_options, {foreignKey: 'szOptionId', as: 'Option', sourceKey: 'szOptionId'})
      this.hasMany(models.sc_qs_optionitems, {foreignKey: 'szOptionId', as: 'OptionItems', sourceKey: 'szOptionId'})
      // this.hasMany(models.sc_qs_optionitems, {foreignKey: 'szOptionId', as: 'OptionItems', sourceKey: 'szOptionId'})
    }
  }
  sc_qs_question_items.init(
    {
      szQuestionId:{ type: DataTypes.STRING, primaryKey: true },
      szTrnId: DataTypes.STRING,
      shItem: DataTypes.INTEGER,
      szQuestion: DataTypes.STRING,
      szAnswerStyleId: DataTypes.STRING,
      szOptionId: DataTypes.STRING,
      decQuestionScore: DataTypes.DECIMAL(8,2),
      bImageQuestion: DataTypes.TINYINT(1),
      bMandatory: DataTypes.TINYINT(1),
      szVariableId: DataTypes.STRING,
      bTimer: DataTypes.TINYINT(1),
      decTimer: DataTypes.DECIMAL(8,2),

      // createdAt: {
      //   type: DataTypes.DATE,
      //   field: "created_at",
      // },
      // updatedAt: {
      //   type: DataTypes.DATE,
      //   field: "updated_at",
      // },
    },
    {
      sequelize,
      modelName: "sc_qs_question_items",
      // underscored: true,
      timestamps: false,

    }
  );
  return sc_qs_question_items;
};

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class sc_qs_question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.sc_qs_config, { foreignKey: "szQuestionId" });
    }
  }
  sc_qs_question.init(
    {
      szQuestionId: DataTypes.STRING,
      szTrnId: DataTypes.STRING,
      szDescQuestion: DataTypes.STRING,
      decTargetVotes: DataTypes.DECIMAL(8, 2),
      bDuration: DataTypes.TINYINT(1),
      decDuration: DataTypes.DECIMAL(8, 2),
      dtmStart: DataTypes.DATE,
      dtmEnd: DataTypes.DATE,
      szAuthor: DataTypes.STRING,
      szNetworkId: DataTypes.STRING,
      szTerritoryId: DataTypes.STRING,
      bActive: DataTypes.TINYINT(1),
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    {
      sequelize,
      modelName: "sc_qs_question",
      // underscored: true,
    }
  );
  return sc_qs_question;
};

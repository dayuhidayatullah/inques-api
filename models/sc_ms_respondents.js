"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sc_ms_respondents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sc_ms_respondents.init(
    {
      szNetworkId: DataTypes.STRING,
      szTerritoryId: DataTypes.STRING,
      szEmailRespondent: DataTypes.STRING,
      szUsernameRespondent: { type: DataTypes.STRING, primaryKey: true },
      szPassword: DataTypes.STRING,
      szFullName: DataTypes.STRING,
      szPhone: DataTypes.STRING,
      szNIK: DataTypes.STRING,
      szDivision: DataTypes.STRING,
      szPosition: DataTypes.STRING,
      szPersonnelArea: DataTypes.STRING,
      dtmBirthDay: DataTypes.DATE,
      dtmStartofWork: DataTypes.DATE,
      szAddress: DataTypes.STRING,
      szCountry: DataTypes.STRING,
      szProvince: DataTypes.STRING,
      szCity: DataTypes.STRING,
      szDistrict: DataTypes.STRING,
      szSubDistrict: DataTypes.STRING,
      decPostalCode: DataTypes.DECIMAL(8, 2),
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
      modelName: "sc_ms_respondents",
    }
  );
  return sc_ms_respondents;
};

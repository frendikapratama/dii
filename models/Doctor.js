const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Doctor = sequelize.define(
  "Doctor",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "doctors",
    timestamps: false,
  }
);

module.exports = Doctor;

const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_verified_at: DataTypes.DATE,
    remember_token: DataTypes.STRING,
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = User;

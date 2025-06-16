const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Doctor = require("./Doctor");

const Schedule = sequelize.define(
  "Schedule",
  {
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    day: DataTypes.STRING,
    tanggal: DataTypes.DATEONLY,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    quota: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
  },
  {
    tableName: "schedules",
    timestamps: false,
  }
);

Schedule.belongsTo(Doctor, { foreignKey: "doctor_id" });

module.exports = Schedule;

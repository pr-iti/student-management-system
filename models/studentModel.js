// models/Student.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("../models/UserModel");

const student = sequelize.define("student", {
  stu_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  gender: {
    type: DataTypes.ENUM("male", "female", "other"),
    allowNull: false,
  },

  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  courses: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  photo: {
    type: DataTypes.STRING, // store file path
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
});

// Associations
User.hasOne(student, { foreignKey: "id" });
student.belongsTo(User, { foreignKey: "id" });

module.exports = student;

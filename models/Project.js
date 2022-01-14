const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Project extends Model {}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    project_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      // STRING default length is 255, should be enough for a short description
      type: DataTypes.STRING,
      allowNull: false
    },
    cost: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    project_order_number: {
      type: DataTypes.NUMBER,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['New', 'In Progress', 'Completed'],
      defaultValue: 'New'
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'client',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'project'
  }
)

module.exports = Project

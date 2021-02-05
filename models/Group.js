const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Group extends Model { }

Group.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        group_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        group_text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'group'
    }
)

module.exports = Group;
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model { }

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        event_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        event_text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        event_location: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        event_time: {
            type: DataTypes.STRING,
            allowNull: false
        },
        group_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'group',
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
);

module.exports = Event;
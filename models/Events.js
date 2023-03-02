const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {} 

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate : {
                min : 1,
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        date: {
            type: DataTypes.DATEONLY, 
            allowNull: false,
        },
        time : {
            type: DataTypes.TIME,
            allowNull: false,
        },
        user_id : {
            type : DataTypes.INTEGER,
            references : {
                model : 'users',
                key: 'id',
            }
        }
    },
    {
        sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: 'events',
    }
);
 
module.exports = Event;
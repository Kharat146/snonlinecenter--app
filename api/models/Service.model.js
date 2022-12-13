'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
    }
  }

  Service.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name:{
        type: DataTypes.STRING,
        allowNull: true
      },
      icon:{
        type: DataTypes.STRING
      }
      
    },
    {
      hooks: {
        beforeCreate: () => {},
        beforeUpdate: () => {},
        afterCreate: () => {},
        afterUpdate: () => {},
      },
      sequelize,
      modelName: 'service',
    },
  );

  return Service;
};

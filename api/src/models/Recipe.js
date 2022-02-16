const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    spoonacularScore: {
      type: DataTypes.FLOAT,
      default: 0
    },
    healthScore: {
      type: DataTypes.FLOAT,
      default:0
    },
    analyzedInstructions: {
      type: DataTypes.ARRAY(DataTypes.JSONTYPE),
      default:[]
    }
  });
};

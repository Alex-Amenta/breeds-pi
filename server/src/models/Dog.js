const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('dog', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        min_height: {
            type: DataTypes.STRING,
            allowNull: false
        },
        max_height: {
            type: DataTypes.STRING,
            allowNull: false
        },
        min_weight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        max_weight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        life_spanMin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        life_spanMax: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, { timestamps: false });
};

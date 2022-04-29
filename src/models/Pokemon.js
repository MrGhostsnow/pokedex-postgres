const Sequelize = require('sequelize')
const connection = require('../database/db')

const Pokemon = connection.define('pokemon', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imagem:{
        type: Sequelize.STRING,
        allowNull: false,
    },
},
{
    frezzeTableName: true,
    timestamps: false,
    createAt: false,
    updatedAt: false,
}
);

module.exports = Pokemon;
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("post", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      autorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: "autor",
        },
      },
      titulo: Sequelize.STRING,
      conteudo: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("post");
  },
};

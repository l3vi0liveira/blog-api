"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("arquivos", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          key: "id",
          model: "post",
        },
      },
      originalname: Sequelize.STRING,
      mimetype: Sequelize.STRING,
      filename: Sequelize.STRING,
      size: Sequelize.NUMERIC,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("arquivos");
  },
};

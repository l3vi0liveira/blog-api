const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Arquivos = sequelize.define(
    "Arquivos",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      originalname: DataTypes.STRING,
      mimetype: DataTypes.STRING,
      filename: DataTypes.STRING,
      size: DataTypes.NUMERIC,
      url: {
        type: DataTypes.VIRTUAL,
        get() {
          return "http://localhost:3312/files/" + this.getDataValue("filename");
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: "arquivos",
    }
  );

  Arquivos.associate = (models) => {
    Arquivos.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "post",
    });
  };

  return Arquivos;
};

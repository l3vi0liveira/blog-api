module.exports = (sequelize, DataTypes) => {
  const Comentario = sequelize.define(
    "Comentario",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      texto: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: "comentario",
    }
  );
  Comentario.associate = (models) => {
    Comentario.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "post",
    });
  };
  return Comentario;
};

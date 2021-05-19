module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      titulo: DataTypes.STRING,
      conteudo: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tabela: "post",
    }
  );
  Post.associate = (models) => {
    Post.belongsTo(models.Autor, {
      foreignKey: "autorId",
      as: "autor",
    });
    Post.hasMany(models.Comentario, {
      foreignKey: "postId",
      as: "comentario",
    });
    Post.belongsToMany(models.Marcador, {
      foreignKey: "postId",
      as: "marcador",
      through: "post_marcador",
    });
  };
  return Post;
};

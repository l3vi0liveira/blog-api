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
      tableName: "post",
    }
  );
  Post.associate = (models) => {
    //Um post pertence a um autor
    Post.belongsTo(models.Autor, {
      foreignKey: "autorId",
      as: "autor",
    });
    //Num post pode conter varios comentarios
    Post.hasMany(models.Comentario, {
      foreignKey: "postId",
      as: "comentario",
    });
    //Um post pode ter varios marcadores, e o mesmo marcador pode estar em varios posts
    Post.belongsToMany(models.Marcador, {
      foreignKey: "postId",
      as: "marcador",
      through: "post_marcador",
    });
    //Num post pode conter varios arquivos
    Post.hasMany(models.Arquivos, {
      foreignKey: "postId",
      as: "arquivos",
    });
  };
  return Post;
};

module.exports = (sequelize, DataTypes) => {
  const Autor = sequelize.define(
    "Autor",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: "autor",
    }
  );

  Autor.associate = (models) => {
    Autor.hasMany(models.Post, {
      foreignKey: "autorId",
      as: "post",
    });
  };

  return Autor;
};

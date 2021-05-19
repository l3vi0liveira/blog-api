module.exports = (sequelize, DataTypes) => {
  const Marcador = sequelize.define(
    "Marcador",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tabela: "marcador",
    }
  );
  Marcador.associate = (models) => {
    Marcador.belongsToMany(models.Post, {
      foreignKey: "marcadorId",
      as: "post",
      through: "post_marcador",
    });
  };
  return Marcador;
};

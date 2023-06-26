import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Ville extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    idVille: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    coordonnees: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Ville',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idVille" },
        ]
      },
    ]
  });
  }
}

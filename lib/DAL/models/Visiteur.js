import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Visiteur extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    idVisiteur: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    prenom: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    adresse: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    idParrain: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'Visiteur',
        key: 'idVisiteur'
      }
    },
    idVille: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'Ville',
        key: 'idVille'
      }
    }
  }, {
    sequelize,
    tableName: 'Visiteur',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idVisiteur" },
        ]
      },
      {
        name: "idParrain",
        using: "BTREE",
        fields: [
          { name: "idParrain" },
        ]
      },
      {
        name: "idVille",
        using: "BTREE",
        fields: [
          { name: "idVille" },
        ]
      },
    ]
  });
  }
}

import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Participe extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    idConcert: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Concert',
        key: 'idConcert'
      }
    },
    idVisiteur: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Visiteur',
        key: 'idVisiteur'
      }
    }
  }, {
    sequelize,
    tableName: 'Participe',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idConcert" },
          { name: "idVisiteur" },
        ]
      },
      {
        name: "idVisiteur",
        using: "BTREE",
        fields: [
          { name: "idVisiteur" },
        ]
      },
    ]
  });
  }
}

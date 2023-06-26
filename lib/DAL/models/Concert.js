import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Concert extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    idConcert: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    dateConcert: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    nbrPlaceDisponible: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idVille: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Ville',
        key: 'idVille'
      }
    }
  }, {
    sequelize,
    tableName: 'Concert',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idConcert" },
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

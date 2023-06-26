import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Realise extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IdArtiste: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Artiste',
        key: 'IdArtiste'
      }
    },
    idConcert: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Concert',
        key: 'idConcert'
      }
    }
  }, {
    sequelize,
    tableName: 'Realise',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IdArtiste" },
          { name: "idConcert" },
        ]
      },
      {
        name: "idConcert",
        using: "BTREE",
        fields: [
          { name: "idConcert" },
        ]
      },
    ]
  });
  }
}

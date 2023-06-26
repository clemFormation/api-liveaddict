import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Joue extends Model {
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
    idStyle: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Style',
        key: 'idStyle'
      }
    }
  }, {
    sequelize,
    tableName: 'Joue',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idConcert" },
          { name: "idStyle" },
        ]
      },
      {
        name: "idStyle",
        using: "BTREE",
        fields: [
          { name: "idStyle" },
        ]
      },
    ]
  });
  }
}

import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Artiste extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IdArtiste: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    pseudo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    idStyle: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'Style',
        key: 'idStyle'
      }
    }
  }, {
    sequelize,
    tableName: 'Artiste',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IdArtiste" },
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

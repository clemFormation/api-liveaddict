import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Style extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    idStyle: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    libelle: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(5000),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Style',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idStyle" },
        ]
      },
    ]
  });
  }
}

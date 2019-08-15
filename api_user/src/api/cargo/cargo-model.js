export default function (sequelize, DataTypes) {
  return sequelize.define(
    "cargo",
    {
      cargoId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "CargoId"
      },
      customerId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "customer",
          key: "CustomerId"
        },
        field: "CustomerId"
      },
      cargoName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "CargoName"
      },
      cargoDeletedDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "CargoDeletedDate"
      },
      cargoDeletedUser: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: "CargoDeletedUser"
      }
    },
    {
      tableName: "cargo",
      timestamps: false,
      freezeTableName: true,
    }
  );
}

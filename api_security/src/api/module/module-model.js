"use strict";

export default function(sequelize, DataTypes) {
  return sequelize.define(
    "Module",
    {
      Id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        field: "ModuleId"
      },
      moduleIdParent: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: "module",
          key: "ModuleId"
        },
        field: "ModuleId_Parent"
      },
      moduleName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "ModuleName"
      },
      moduleUrl: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "ModuleUrl"
      },
      moduleIcon: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: "ModuleIcon"
      }
    },
    {
      tableName: "Module",
      timestamps: false
    }
  );
}

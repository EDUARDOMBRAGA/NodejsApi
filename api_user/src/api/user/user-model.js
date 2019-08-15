"use strict";

export default function(sequelize, DataTypes) {
  return sequelize.define(
    "user",
    {
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "UserId"
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
      departmentId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "department",
          key: "DepartmentId"
        },
        field: "DepartmentId"
      },
      cargoId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "cargo",
          key: "CargoId"
        },
        field: "CargoId"
      },
      profileId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "profile",
          key: "ProfileId"
        },
        field: "ProfileId"
      },
      userStatusId: {
        type: DataTypes.INTEGER(6),
        allowNull: false,
        references: {
          model: "userstatus",
          key: "UserStatusId"
        },
        field: "UserStatusId"
      },
      avatar: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: "Avatar"
      },
      userMainEmail: {
        type: DataTypes.STRING(254),
        allowNull: false,
        unique: true,
        field: "UserMainEmail"
      },
      userPassword: {
        type: DataTypes.STRING(300),
        allowNull: false,
        field: "UserPassword"
      },
      userName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "UserName"
      },
      userGender: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        field: "UserGender"
      },
      userBirthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: "UserBirthDate"
      },
      userCpf: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true,
        field: "UserCPF"
      },
      userFirstLoginDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "UserFirstLoginDate"
      },
      userDeletedDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "UserDeletedDate"
      },
      userDeletedUser: {
        type: DataTypes.BIGINT(20),
        allowNull: true,
        field: "UserDeletedUser"
      }
    },
    {
      tableName: "User",
      timestamps: false
    }
  );
}

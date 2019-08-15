"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      "User",
      {
        userId: {
          field: "UserId",
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        customerId: {
          field: "CustomerId",
          allowNull: false,
          type: DataTypes.INTEGER(11),
          references: {
            model: {
              tableName: "customer"
            },
            key: "CustomerId"
          }
        },
        departmentId: {
          field: "DepartmentId",
          type: DataTypes.INTEGER(11),
          allowNull: false,
          references: {
            model: "department",
            key: "DepartmentId"
          }
        },
        cargoId: {
          field: "CargoId",
          type: DataTypes.INTEGER(11),
          allowNull: false,
          references: {
            model: "cargo",
            key: "CargoId"
          }
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
          type: DataTypes.BIGINT,
          allowNull: true,
          unique: true,
          field: "UserCPF"
        },
        userFirstLoginDate: {
          type: DataTypes.DATE,
          allowNull: true,
          field: "UserFirstLoginDate"
        }
      },
      {
        timestamps: false
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("User");
  }
};

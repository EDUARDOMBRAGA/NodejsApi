"use strict";

export default function(sequelize, DataTypes) {
  let user = sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
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
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: true,
        field: "UserCPF"
      },
      userFirstLoginDate: {
        type: DataTypes.STRING(45),
        allowNull: true,
        field: "UserFirstLoginDate"
      }
    },
    {
      tableName: "User",
      timestamps: false
    }
  );
  user.associate = models => {
    models.User.hasOne(models.Profile, {
      foreignKey: "profileId",
      sourceKey: "profileId",
      as: "profiles"
    });

    models.Profile.belongsToMany(models.Module, {
      through: "Profile_Module"
    });
  };
  return user;
}

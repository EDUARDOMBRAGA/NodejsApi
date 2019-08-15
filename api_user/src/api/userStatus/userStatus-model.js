export default function (sequelize, DataTypes) {
  return sequelize.define('userstatus', {
    userStatusId: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'UserStatusId'
    },
    userStatusName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'UserStatusName'
    }
  }, {
      tableName: 'userstatus',
      timestamps: false,
    });
};

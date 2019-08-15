export default function(sequelize, DataTypes) {
	return sequelize.define('useremail', {
		userEmailId: {
			type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
			primaryKey: true,
			field: 'userEmailId'
		},
		userId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			references: {
				model: 'user',
				key: 'UserId'
			},
			field: 'UserId'
		},
		emailTypeId: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			references: {
				model: 'emailtype',
				key: 'emailTypeId'
			},
			field: 'emailTypeId'
		},
		userEmail: {
			type: DataTypes.STRING(254),
			allowNull: false,
			field: 'userEmail'
		}
	}, {
    tableName: 'useremail',
    timestamps: false,
	});
};

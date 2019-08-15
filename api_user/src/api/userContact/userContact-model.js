export default function(sequelize, DataTypes) {
	return sequelize.define('usercontact', {
		userContactId: {
			type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
			primaryKey: true,
			field: 'userContactId'
		},
		contactTypeId: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			references: {
				model: 'contacttype',
				key: 'contactTypeId'
			},
			field: 'contactTypeId'
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
		userCountryRegion: {
			type: DataTypes.INTEGER(2),
			allowNull: true,
			field: 'UserCountryRegion'
		},
		userDDD: {
			type: DataTypes.INTEGER(2),
			allowNull: true,
			field: 'UserDDD'
		},
		userPhoneNumber: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'UserPhoneNumber'
		}
	}, {
    tableName: 'usercontact',
    timestamps: false,
	});
};

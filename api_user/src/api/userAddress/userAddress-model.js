export default function(sequelize, DataTypes) {
	return sequelize.define('useraddress', {
		userAddressId: {
			type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
			primaryKey: true,
			field: 'UserAddressId'
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
		addressTypeId: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			references: {
				model: 'addresstype',
				key: 'AddressTypeId'
			},
			field: 'AddressTypeId'
		},
		userStreetNumber: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			field: 'UserStreetNumber'
		},
		userStreetName: {
			type: DataTypes.STRING(150),
			allowNull: true,
			field: 'UserStreetName'
		},
		userComplement: {
			type: DataTypes.STRING(30),
			allowNull: true,
			field: 'UserComplement'
		},
		userNeighborhood: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'UserNeighborhood'
		},
		userCity: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'UserCity'
		},
		userState: {
			type: DataTypes.CHAR(2),
			allowNull: true,
			field: 'UserState'
		},
		userCountry: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'UserCountry'
		},
		userZipCode: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'UserZipCode'
		}
	}, {
    tableName: 'userAddress',
    freezeTableName: true,
    timestamps: false,
	});
};

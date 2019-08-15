export default function(sequelize, DataTypes) {
	return sequelize.define('addresstype', {
		addressTypeId: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			primaryKey: true,
			field: 'AddressTypeId'
		},
		addressType: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'AddressType'
		}
	}, {
    tableName: 'addresstype',
    timestamps: false,
	});
};

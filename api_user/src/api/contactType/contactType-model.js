export default function(sequelize, DataTypes) {
	return sequelize.define('contacttype', {
		contactTypeId: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			primaryKey: true,
			field: 'contactTypeId'
		},
		contactType: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'ContactType'
		}
	}, {
		tableName: 'contacttype',
    timestamps: false,
	});
};

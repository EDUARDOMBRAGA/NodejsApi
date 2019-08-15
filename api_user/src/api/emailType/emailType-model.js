export default function(sequelize, DataTypes) {
	return sequelize.define('emailtype', {
		emailTypeId: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			primaryKey: true,
			field: 'emailTypeId'
		},
		emailType: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'EmailType'
		}
	}, {
		tableName: 'emailtype',
    timestamps: false,
	});
};

'use strict'

export default function (sequelize, DataTypes) {
	return sequelize.define('Profile_Module', {
		profileId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Profile',
				key: 'ProfileId'
			},
			field: 'ProfileId'
		},
		moduleId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Module',
				key: 'ModuleId'
			},
			field: 'ModuleId'
		}
	}, {
			tableName: 'Profile_Module',
			timestamps: false
		});
};

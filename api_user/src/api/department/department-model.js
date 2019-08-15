export default function(sequelize, DataTypes) {
	return sequelize.define('department', {
		departmentId: {
			type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
			primaryKey: true,
			field: 'DepartmentId'
		},
		customerId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'customer',
				key: 'CustomerId'
			},
			field: 'CustomerId'
		},
		departmentName: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'DepartmentName'
		},
		departmentDeletedDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'DepartmentDeletedDate'
		},
		departmentDeletedUser: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'DepartmentDeletedUser'
		}
	}, {
    tableName: 'department',
    timestamps: false,
	});
};

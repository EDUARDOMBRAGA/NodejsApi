export default function(sequelize, DataTypes) {
	return sequelize.define('customer', {
		customerId: {
			type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
			primaryKey: true,
			field: 'CustomerId'
		},
		customerStatusId: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			references: {
				model: 'customerstatus',
				key: 'CustomerStatusId'
			},
			field: 'CustomerStatusId'
		},
		customerName: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'CustomerName'
		},
		customerEmail: {
			type: DataTypes.STRING(254),
			allowNull: true,
			field: 'CustomerEmail'
		},
		customerCnpj: {
			type: DataTypes.BIGINT,
			allowNull: true,
			unique: true,
			field: 'CustomerCNPJ'
		},
		customerCpf: {
			type: DataTypes.BIGINT,
			allowNull: true,
			unique: true,
			field: 'CustomerCPF'
		},
		customerLogo: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'CustomerLogo'
		},
		customerDescription: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'CustomerDescription'
		},
		customerTokenWavyApi: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'CustomerTokenWavyAPI'
		},
		customerUserWavyApi: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'CustomerUserWavyAPI'
		},
		customerPasswordWavyApi: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'CustomerPasswordWavyAPI'
		},
		customerPhoneWavyApi: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'CustomerPhoneWavyAPI'
		},
		customerActivateDate: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'CustomerActivateDate'
		},
		customerPaymentDay: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			field: 'CustomerPaymentDay'
		},
		customerMailChimpToken: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'CustomerMailChimpToken'
		}
	}, {
    tableName: 'customer',
    timestamps: false,
	});
};

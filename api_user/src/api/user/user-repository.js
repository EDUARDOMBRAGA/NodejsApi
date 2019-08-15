import Sequelize, { sequelize } from "../../config/database";

const Op = Sequelize.Op;

export {
  register,
  findAll,
  findByEmail,
  update,
  remove,
  recoverPassword,
  changePassword
};

const models = sequelize().models;

// Joins das tabelas de domínio
models.emailtype.belongsTo(models.useremail, { foreignKey: "emailTypeId" });
models.useremail.hasOne(models.emailtype, {
  foreignKey: "emailTypeId",
  sourceKey: "emailTypeId",
  as: "emailType"
});

models.contacttype.belongsTo(models.usercontact, {
  foreignKey: "contactTypeId"
});
models.usercontact.hasOne(models.contacttype, {
  foreignKey: "contactTypeId",
  sourceKey: "contactTypeId",
  as: "contactType"
});

models.addresstype.belongsTo(models.useraddress, {
  foreignKey: "addressTypeId"
});
models.useraddress.hasOne(models.addresstype, {
  foreignKey: "addressTypeId",
  sourceKey: "addressTypeId",
  as: "addressType"
});

//Joins das tabelas de usuário
models.useremail.belongsTo(models.user, { foreignKey: "userId" });
models.user.hasMany(models.useremail, {
  foreignKey: "userId",
  sourceKey: "userId",
  as: "userEmails"
});

models.usercontact.belongsTo(models.user, { foreignKey: "userId" });
models.user.hasMany(models.usercontact, {
  foreignKey: "userId",
  sourceKey: "userId",
  as: "userContacts"
});

models.useraddress.belongsTo(models.user, { foreignKey: "userId" });
models.user.hasMany(models.useraddress, {
  foreignKey: "userId",
  sourceKey: "userId",
  as: "userAddresses"
});
models.userstatus.belongsTo(models.user);
models.user.hasOne(models.userstatus, {
  foreignKey: "userStatusId",
  sourceKey: "userStatusId",
  as: "userStatus"
});
models.profile.belongsTo(models.user);
models.user.hasOne(models.profile, {
  foreignKey: "profileId",
  sourceKey: "profileId",
  as: "profile"
});
models.department.belongsTo(models.user);
models.user.hasOne(models.department, {
  foreignKey: "departmentId",
  sourceKey: "departmentId",
  as: "department"
});
models.cargo.belongsTo(models.user);
models.user.hasOne(models.cargo, {
  foreignKey: "cargoId",
  sourceKey: "cargoId",
  as: "cargo"
});

function register(register) {
  return sequelize().transaction(async t => {
    let userRegistered = register.userId
      ? await models.user.create(
          {
            userId: register.userId,
            customerId: register.customerId,
            departmentId: register.departmentId,
            cargoId: register.cargoId,
            profileId: register.profileId,
            userStatusId: register.userStatusId,
            avatar: register.avatar,
            userMainEmail: register.userMainEmail,
            userPassword: Sequelize.fn("SHA2", register.password, 256),
            userName: register.userName,
            userGender: register.userGender,
            userBirthDate: new Date(register.userBirthDate),
            userCpf: register.userCPF
          },
          { transaction: t }
        )
      : await models.user.create(
          {
            customerId: register.customerId,
            departmentId: register.departmentId,
            cargoId: register.cargoId,
            profileId: register.profileId,
            userStatusId: register.userStatusId,
            avatar: register.avatar,
            userMainEmail: register.userMainEmail,
            userPassword: Sequelize.fn("SHA2", register.password, 256),
            userName: register.userName,
            userGender: register.userGender,
            userBirthDate: new Date(register.userBirthDate),
            userCpf: parseInt(register.userCPF)
          },
          { transaction: t }
        );

    if (register.addresses) {
      register.addresses.map(address => {
        address.userId = userRegistered.userId;
        if (address.userStreetNumber)
          address.userStreetNumber = parseInt(address.userStreetNumber);
      });
      await models.useraddress.bulkCreate(register.addresses, {
        transaction: t
      });
    }

    if (register.extraMail) {
      register.extraMail.map(mail => (mail.userId = userRegistered.userId));
      await models.useremail.bulkCreate(register.extraMail, { transaction: t });
    }

    if (register.contacts) {
      register.contacts.map(
        contact => (contact.userId = userRegistered.userId)
      );
      await models.usercontact.bulkCreate(register.contacts, {
        transaction: t
      });
    }

    return userRegistered;
  });
}

async function findAll(options) {
  let limit = null;
  let offset = null;
  let qUserName = options.query.userName ? options.query.userName : "";
  let qUserMainEmail = options.query.userMainEmail
    ? options.query.userMainEmail
    : "";

  if (
    options.query.limit &&
    (options.query.offset || options.query.offset === 0)
  ) {
    limit = parseInt(options.query.limit);
    offset = parseInt(options.query.offset);
  }

  let user = await models.user.findAll({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("lower", Sequelize.col("userName")), {
          [Op.like]: Sequelize.fn("lower", "%" + qUserName + "%")
        }),
        Sequelize.where(Sequelize.fn("lower", Sequelize.col("userMainEmail")), {
          [Op.like]: Sequelize.fn("lower", "%" + qUserMainEmail + "%")
        })
      ],
      UserDeletedDate: { [Op.is]: null },
      UserDeletedUser: { [Op.is]: null },
      CustomerId: options.user.customerId
    },
    attributes: {
      exclude: ["userFirstLoginDate", "userPassword"]
    },
    include: [
      {
        model: models.useremail,
        required: false,
        as: "userEmails",
        attributes: ["userEmailId", "userEmail", "emailTypeId"],
        include: [
          {
            model: models.emailtype,
            required: false,
            as: "emailType",
            attributes: []
          }
        ]
      },
      {
        model: models.usercontact,
        required: false,
        as: "userContacts",
        attributes: [
          "userContactId",
          "userCountryRegion",
          "userDDD",
          "userPhoneNumber",
          "contactTypeId"
        ],
        include: [
          {
            model: models.contacttype,
            required: false,
            as: "contactType",
            attributes: []
          }
        ]
      },
      {
        model: models.useraddress,
        required: false,
        as: "userAddresses",
        attributes: [
          "userAddressId",
          "userStreetNumber",
          "userStreetName",
          "userComplement",
          "userNeighborhood",
          "userCity",
          "userState",
          "userCountry",
          "userZipCode",
          "addressTypeId"
        ],
        include: [
          {
            model: models.addresstype,
            required: false,
            as: "addressType",
            attributes: []
          }
        ]
      },
      {
        model: models.userstatus,
        required: true,
        as: "userStatus",
        attributes: ["userStatusId", "userStatusName"]
      },
      {
        model: models.profile,
        required: true,
        as: "profile",
        attributes: ["profileId", "profileName"]
      },
      {
        model: models.department,
        required: true,
        as: "department",
        attributes: ["departmentId", "departmentName"]
      },
      {
        model: models.cargo,
        required: true,
        as: "cargo",
        attributes: ["cargoId", "cargoName"]
      }
    ],
    order: [[Sequelize.literal("userStatusId, userName"), "ASC"]],
    offset: offset,
    limit: limit
  });

  if (!user) return;

  let newUser = [];

  user.map(users => {
    newUser.push({
      userId: users.userId ? users.userId : null,
      avatar: users.avatar ? users.avatar : null,
      userMainEmail: users.userMainEmail,
      userName: users.userName,
      userGender: users.userGender,
      userBirthDate: users.userBirthDate,
      userCpf: users.userCpf,
      profileId: users.profile.profileId,
      profile: users.profile.profileName,
      departmentId: users.department.departmentId,
      department: users.department.departmentName,
      cargoId: users.cargo.cargoId,
      cargo: users.cargo.cargoName,
      userStatusId: users.userStatus.userStatusId,
      userStatus: users.userStatus.userStatusName,
      addresses: users.userAddresses,
      contacts: users.userContacts,
      extraMail: users.userEmails
    });
  });
  return newUser;
}

async function findByEmail(mail) {
  let user = await models.user.findAll({
    where: { usermainemail: mail },
    include: [
      {
        model: models.useremail,
        required: false,
        as: "userEmails",
        attributes: ["userEmailId", "userEmail"],
        include: [
          {
            model: models.emailtype,
            required: false,
            as: "emailType",
            attributes: ["emailType", "emailTypeId"]
          }
        ]
      },
      {
        model: models.usercontact,
        required: false,
        as: "userContacts",
        attributes: [
          "userContactId",
          "userCountryRegion",
          "userDDD",
          "userPhoneNumber"
        ],
        include: [
          {
            model: models.contacttype,
            required: false,
            as: "contactType",
            attributes: ["contactType", "contactTypeId"]
          }
        ]
      },
      {
        model: models.useraddress,
        required: false,
        as: "userAddresses",
        attributes: [
          "userAddressId",
          "userStreetNumber",
          "userStreetName",
          "userComplement",
          "userNeighborhood",
          "userCity",
          "userState",
          "userCountry",
          "userZipCode"
        ],
        include: [
          {
            model: models.addresstype,
            required: false,
            as: "addressType",
            attributes: ["addressType", "addressTypeId"]
          }
        ]
      },
      {
        model: models.userstatus,
        required: true,
        as: "userStatus",
        attributes: ["userStatusName"]
      },
      {
        model: models.profile,
        required: true,
        as: "profile",
        attributes: ["profileName"]
      },
      {
        model: models.department,
        required: true,
        as: "department",
        attributes: ["departmentName"]
      },
      {
        model: models.cargo,
        required: true,
        as: "cargo",
        attributes: ["cargoName"]
      }
    ]
  });

  if (!user) return;

  let newUser = [];
  user.map(users => {
    newUser.push({
      userId: users.userId ? users.userId : null,
      avatar: users.avatar ? users.avatar : null,
      userMainEmail: users.userMainEmail,
      userName: users.userName,
      userGender: users.userGender,
      userBirthDate: users.userBirthDate,
      userCpf: users.userCpf,
      addresses: users.userAddresses,
      contacts: users.userContacts,
      extraMail: users.userEmails,
      userStatus: users.userStatus.userStatusName,
      profile: users.profile.profileName,
      department: users.department.departmentName,
      cargo: users.cargo.cargoName
    });
  });
  return newUser[0];
}

async function update(save, mail) {
  let user = await findByEmail(mail);

  if (!user)
    throw {
      status: 404,
      message: "Nenhum usuário foi encontrado com esse email!"
    };

  let userAddresses = [],
    userContacts = [],
    userExtraEmails = [];

  if (user.addresses) {
    user.addresses.map(address => userAddresses.push(address.userAddressId));
  }
  if (user.contacts) {
    user.contacts.map(contact => userContacts.push(contact.userContactId));
  }
  if (user.extraMail) {
    user.extraMail.map(email => userExtraEmails.push(email.userEmailId));
  }

  return sequelize().transaction(async t => {
    for (let i = 0; i < userAddresses.length; i++) {
      await models.useraddress.destroy(
        {
          where: {
            userAddressId: userAddresses[i]
          }
        },
        { transaction: t }
      );
    }
    for (let i = 0; i < userContacts.length; i++) {
      await models.usercontact.destroy(
        {
          where: {
            userContactId: userContacts[i]
          }
        },
        { transaction: t }
      );
    }
    for (let i = 0; i < userExtraEmails.length; i++) {
      await models.useremail.destroy(
        {
          where: {
            userEmailId: userExtraEmails[i]
          }
        },
        { transaction: t }
      );
    }
    await models.user.update(
      {
        departmentId: save.departmentId,
        cargoId: save.cargoId,
        profileId: save.profileId,
        avatar: save.avatar,
        userName: save.userName,
        userGender: save.userGender,
        userBirthDate: save.userBirthDate ? new Date(save.userBirthDate) : null,
        userStatusId: save.userStatusId
      },
      {
        where: { [Op.and]: { userMainEmail: mail, userId: user.userId } },
        transaction: t
      }
    );
    if (save.addresses) {
      save.addresses.map(address => {
        address.userId = user.userId;
        if (address.userStreetNumber)
          address.userStreetNumber = parseInt(address.userStreetNumber);
      });
      await models.useraddress.bulkCreate(save.addresses, {
        transaction: t
      });
    }
    if (save.extraMail) {
      save.extraMail.map(email => (email.userId = user.userId));
      await models.useremail.bulkCreate(save.extraMail, { transaction: t });
    }
    if (save.contacts) {
      save.contacts.map(contact => (contact.userId = user.userId));
      await models.usercontact.bulkCreate(save.contacts, { transaction: t });
    }
    return user;
  });
}

async function remove(userId, email) {
  return await models.user.update(
    {
      userDeletedDate: new Date(),
      userDeletedUser: userId,
      userStatusId: 2
    },
    { where: { userMainEmail: email } }
  );
}

async function recoverPassword(password, mail) {
  return models.user.update(
    {
      userPassword: Sequelize.fn("SHA2", password, 256)
    },
    { where: { userMainEmail: mail } }
  );
}

async function changePassword(mail, credentials) {
  return models.user.update(
    {
      userPassword: Sequelize.fn("SHA2", credentials.newPassword, 256),
      userFirstLoginDate: new Date(),
      userStatusId: 1
    },
    credentials.oldPassword === "††††††††"
      ? { where: { userMainEmail: mail } }
      : {
          where: {
            [Op.and]: {
              userMainEmail: mail,
              userPassword: [Sequelize.fn("SHA2", credentials.oldPassword, 256)]
            }
          }
        }
  );
}

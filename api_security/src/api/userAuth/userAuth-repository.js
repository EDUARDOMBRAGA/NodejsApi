"use strict";

import Sequelize, { sequelize } from "../../config/database";

export { login };

const models = sequelize().models;
const Op = Sequelize.Op;

async function login(params) {
  let result = await models.User.findAll({
    where: {
      [Op.and]: {
        userMainEmail: params.useremail,
        userPassword: [Sequelize.fn("SHA2", params.userpassword, 256)]
      }
    },
    include: [
      {
        model: models.Profile,
        required: true,
        as: "profiles",
        include: [
          {
            model: models.Module,
            attributes: [
              "moduleId",
              "moduleId_Parent",
              "moduleName",
              "moduleUrl",
              "moduleIcon",
              [sequelize().literal("'Filho'"), "Nivel"]
            ],
            where: {
              moduleUrl: { [Op.not]: null }
            },
            through: { attributes: [] }
          }
        ]
      }
    ]
  });

  let modulesCheck = [];

  //Map dos Modulos que o usuario possui acesso
  modulesCheck = result[0].profiles.Modules.map(x => x.dataValues);

  // ids dos modulos pais
  let ids = [...new Set(modulesCheck.map(x => x.moduleId_Parent))];

  //return array modulos pais
  let modulesAll = await listModules(ids);

  // Return modulos pais e seus filhos de acordo com acesso do usuario
  for (let i = 0; i < modulesAll.length; i++) {
    for (let j = 0; j < modulesCheck.length; j++) {
      if (modulesAll[i].moduleId === modulesCheck[j].moduleId_Parent) {
        modulesAll[i].filhos = modulesCheck.filter(
          d => d.moduleId_Parent === modulesAll[i].moduleId
        );
      }
    }
  }

  let infoUser = [];

  result.map(indice => {
    infoUser.push({
      userId: indice.profileId,
      customerId: indice.customerId,
      departmentId: indice.departmentId,
      cargoId: indice.cargoId,
      profileId: indice.profileId,
      userStatusId: indice.userStatusId,
      avatar: indice.userAvatar,
      userMainEmail: indice.userMainEmail,
      userPassword: indice.userPassword,
      userName: indice.userName,
      userGender: indice.userGender,
      userBirthDate: indice.userBirthDate,
      userCpf: indice.userCpf,
      userFirstLoginDate: indice.userFirstLoginDate,
      modules: modulesAll
    });
  });

  return infoUser[0];
}

async function listModules(ids) {
  let lstModule = await models.Module.findAll({
    where: {
      moduleId: { [Op.in]: ids }
    },
    order: [["moduleID", "ASC"]],
    attributes: [
      "moduleId",
      "moduleName",
      "moduleIcon",
      [sequelize().literal("'Pai'"), "Nivel"]
    ],
    raw: true
  });

  return lstModule;
}

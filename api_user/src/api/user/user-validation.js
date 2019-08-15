import * as Joi from "@hapi/joi";

const schemaValidation = {
  register: Joi.object().keys({
    userId: Joi.number()
      .integer()
      .min(1),
    customerId: Joi.number()
      .integer()
      .required(),
    departmentId: Joi.number()
      .integer()
      .required(),
    cargoId: Joi.number()
      .integer()
      .required(),
    profileId: Joi.number()
      .integer()
      .required(),
    userStatusId: Joi.number()
      .integer()
      .required(),
    avatar: [Joi.string(), Joi.any()],
    userMainEmail: Joi.string()
      .email()
      .required(),
    userName: Joi.string()
      .max(100)
      .required(),
    userGender: Joi.string()
      .valid("m", "f")
      .required()
      .insensitive(),
    userBirthDate: Joi.date()
      .min("1-1-1961")
      .max("1-1-2002")
      .required(),
    userCPF: [
      Joi.string()
        .max(20)
        .min(11)
        .required(),
      Joi.string()
        .alphanum()
        .length(12)
        .required()
    ],
    addresses: Joi.array().items(
      Joi.object().keys({
        addressTypeId: Joi.number()
          .integer()
          .min(1),
        userStreetNumber: [
          Joi.number()
            .integer()
            .min(1),
          Joi.string().alphanum()
        ],
        userStreetName: Joi.string().max(150),
        userComplement: Joi.string().max(30),
        userNeighborhood: Joi.string().max(50),
        userCity: Joi.string().max(50),
        userState: Joi.string().max(2),
        userCountry: Joi.string().max(50),
        userZipCode: Joi.number()
          .integer()
          .min(1)
      })
    ),
    contacts: Joi.array().items(
      Joi.object().keys({
        contactTypeId: Joi.number()
          .integer()
          .min(1),
        userCountryRegion: Joi.number()
          .integer()
          .min(1)
          .max(99),
        userDDD: Joi.number()
          .integer()
          .min(1)
          .max(99),
        userPhoneNumber: Joi.number().min(10000000)
      })
    ),
    extraMail: Joi.array().items(
      Joi.object().keys({
        emailTypeId: Joi.number()
          .integer()
          .min(1)
          .optional(),
        userEmail: Joi.string()
          .email()
          .optional()
      })
    )
  }),
  findAll: {
    query: Joi.object({
      offset: Joi.number()
        .integer()
        .min(0)
        .default(0),
      limit: Joi.number()
        .integer()
        .min(1)
        .default(50)
        .max(50),
      userName: Joi.string()
        .optional()
        .allow(""),
      userMainEmail: Joi.string()
        .optional()
        .allow("")
    })
  },
  findByMail: Joi.object().keys({
    mail: Joi.string()
      .email()
      .required()
  }),
  update: Joi.object().keys({
    mail: Joi.string()
      .email()
      .required(),
    departmentId: [
      Joi.number()
        .integer()
        .optional()
    ],
    profileId: [
      Joi.number()
        .integer()
        .optional()
    ],
    cargoId: [
      Joi.number()
        .integer()
        .optional()
    ],
    avatar: [Joi.string(), Joi.any()],
    userName: Joi.string().max(100),
    userGender: Joi.string()
      .valid("m", "f")
      .insensitive(),
    userBirthDate: Joi.date()
      .min("1-1-1961")
      .max("1-1-2002"),
    userStatusId: Joi.number()
      .integer()
      .optional(),
    addresses: Joi.array().items(
      Joi.object().keys({
        userAddressId: Joi.number()
          .integer()
          .min(1),
        addressTypeId: Joi.number()
          .integer()
          .min(1),
        userStreetNumber: [
          Joi.number()
            .integer()
            .min(1),
          Joi.string().alphanum(),
          Joi.any()
        ],
        userStreetName: [Joi.string().max(150), Joi.any()],
        userComplement: [Joi.string().max(30), Joi.any()],
        userNeighborhood: [Joi.string().max(50), Joi.any()],
        userCity: [Joi.string().max(50), Joi.any()],
        userState: [Joi.string().max(2), Joi.any()],
        userCountry: [Joi.string().max(50), Joi.any()],
        userZipCode: [
          Joi.number()
            .integer()
            .min(1),
          Joi.any()
        ]
      })
    ),
    contacts: Joi.array().items(
      Joi.object().keys({
        userContactId: Joi.number()
          .integer()
          .min(1),
        contactTypeId: Joi.number()
          .integer()
          .min(1),
        userCountryRegion: Joi.number()
          .integer()
          .min(1)
          .max(99),
        userDDD: Joi.number()
          .integer()
          .min(1)
          .max(99),
        userPhoneNumber: Joi.number().min(10000000)
      })
    ),
    extraMail: Joi.array().items(
      Joi.object().keys({
        userEmailId: Joi.number()
          .integer()
          .min(1),
        emailTypeId: Joi.number()
          .integer()
          .min(1),
        userEmail: Joi.string().email()
      })
    )
  }),
  updateAddress: Joi.object()
    .keys({
      userAddressId: Joi.number()
        .integer()
        .min(1)
        .required(),
      typeId: Joi.number().integer(),
      streetNumber: Joi.number().integer(),
      streetName: Joi.string().max(150),
      complement: Joi.any(),
      neighborhood: Joi.string().max(50),
      city: Joi.string().max(50),
      state: Joi.string().max(2),
      country: Joi.string().max(50),
      zipCode: Joi.number().integer()
    })
    .optionalKeys(
      "streetName",
      "complement",
      "neighborhood",
      "city",
      "state",
      "country"
    ),
  updateContact: Joi.object()
    .keys({
      userContactId: Joi.number()
        .integer()
        .min(1)
        .required(),
      typeId: Joi.number()
        .integer()
        .min(1),
      countryRegion: Joi.number()
        .integer()
        .min(1)
        .max(99),
      DDD: Joi.number()
        .integer()
        .min(1)
        .max(99),
      phoneNumber: Joi.number().min(10000000)
    })
    .optionalKeys("countryRegion", "DDD", "phoneNumber"),
  updateEmail: Joi.object()
    .keys({
      userEmailId: Joi.number()
        .integer()
        .min(1)
        .required(),
      typeId: Joi.number()
        .integer()
        .min(1),
      email: Joi.string().email()
    })
    .optionalKeys("email"),
  remove: Joi.object().keys({
    mail: Joi.string()
      .email()
      .required()
  }),
  recoverPassword: Joi.object().keys({
    mail: Joi.string()
      .email()
      .required()
  }),
  changePassword: Joi.object().keys({
    mail: Joi.string()
      .email()
      .required(),
    oldPassword: Joi.string()
      .length(8)
      .required(),
    newPassword: Joi.string().required()
  })
};

export { Joi, schemaValidation };

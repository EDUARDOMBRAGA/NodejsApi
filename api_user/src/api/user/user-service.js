import * as repository from "./user-repository";
import MD5 from "md5";
import * as mailer from "../../config/utils/mailing";

export {
  register,
  findAll,
  findByEmail,
  update,
  remove,
  recoverPassword,
  changePassword
};

async function register(user) {
  user.password = MD5(new Date())
    .toString()
    .toLowerCase()
    .substr(0, 8);
  let result = await repository.register(user);
  if (result) {
    await mailer.sendEmailToNewUser(user);
    return {
      status: 201,
      message: "User registered successfully!",
      userId: result.userId
    };
  } else {
    throw {
      status: 400,
      message: "You have sent me something wrong!"
    };
  }
}

async function findAll(req) {
  let result = await repository.findAll(req);
  if (result.length) {
    return {
      status: 200,
      message: "Users found.",
      users: result
    };
  } else {
    throw {
      status: 404,
      message: "Nothing was found!"
    };
  }
}

async function findByEmail(mail) {
  let result = await repository.findByEmail(mail);
  if (result) {
    return {
      status: 200,
      message: "User found.",
      user: result
    };
  } else {
    throw {
      status: 404,
      message: "Nothing was found!"
    };
  }
}

async function update(user, mail) {
  let result = await repository.update(user, mail);
  if (result) {
    return {
      status: 200,
      message: "User updated successfully!"
    };
  }
}

async function remove(userId, email) {
  let result = await repository.remove(userId, email);
  if (result) {
    return {
      status: 204,
      message: "User removed successfully!"
    };
  } else {
    throw {
      status: 403,
      message: "You have no power here!"
    };
  }
}

async function recoverPassword(mail) {
  let password = MD5(new Date())
    .toString()
    .toLowerCase()
    .substr(0, 8);
  let result = await repository.recoverPassword(password, mail);
  if (result[0] !== 0) {
    await mailer.sendEmailToRecoverPassword(password, mail);
    return {
      status: 200,
      message: "Password recovered successfully, check your e-mail!"
    };
  } else {
    throw {
      status: 403,
      message: "You have no power here!"
    };
  }
}

async function changePassword(mail, credentials) {
  let result = await repository.changePassword(mail, credentials);
  if (result[0] !== 0) {
    return {
      status: 200,
      message: "Password changed successfully, welcome to the system."
    };
  } else {
    throw {
      status: 403,
      message: "You have no power here!"
    };
  }
}

import * as repository from "./userAuth-repository";
import * as crypto from "../../config/utils/token";

export { login };

async function login(user) {
  let result = await repository.login(user);
  let valida = 0;
  let login = {};

  if (result && !result.userFirstLoginDate) valida = 0;
  //Authenticated and first login
  else if (result && result.userFirstLoginDate && result.userStatusId != 2)
    valida = 1;
  //Authenticated and not first login
  else if (result && result.userStatusId === 2) valida = 2;
  //Authenticate and inactive user in the system
  else valida = 3; //Not authenticated

  switch (valida) {
    case 0:
      login.firstLogin = true;
      login.userData = result;
      login.token = crypto.encrypt(Object.assign(user, login.userData));
      login.userData.modules = result.modules;
      login.message = `Olá ${
        result.userName
      }. Este é seu primeiro acesso, crie sua senha.`;
      break;
    case 1:
      login.firstLogin = false;
      login.userData = result;
      login.token = crypto.encrypt(Object.assign(user, login.userData));
      login.userData.modules = result.modules;
      login.message = `Seja bem vindo ${result.userName}.`;
      break;
    case 2:
      login = {};
      login.status = 401;
      login.message =
        "Sua conta está temporariamente bloqueada. Contate um administrador!";
      break;
    case 3:
      login = {};
      login.status = 401;
      login.message = "Verifique as informaçãoes fornecidas.";
      break;
  }
  return login;
}

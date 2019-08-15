import * as controller from "./userAuth-controller";

export function userRoute(server) {
  server.get("/api/public/login", controller.login);
}

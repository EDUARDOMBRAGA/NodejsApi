import * as controller from './user-controller';

export function userRoute(server) {
  server.post('/api/user', controller.register);
  server.delete('/api/user/:mail', controller.remove);
  server.get('/api/user', controller.findAll);
  server.get('/api/user/:mail', controller.findByEmail);
  server.put('/api/user/:mail', controller.update);
  server.get('/api/public/user/:mail/recover', controller.recoverPassword);
  server.put('/api/user/:mail/password', controller.changePassword);
};

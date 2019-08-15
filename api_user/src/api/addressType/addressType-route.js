import * as controller from './addressType-controller';

export function addressTypeRoute(server) {
	server.get('/api/public/user/address/type', controller.findAll);
};

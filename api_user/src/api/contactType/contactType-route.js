import * as controller from './contactType-controller';

export function contactTypeRoute(server) {
	server.get('/api/public/user/contact/type', controller.findAll);
};

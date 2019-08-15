import * as controller from './emailType-controller';

export function emailTypeRoute(server) {
	server.get('/api/public/user/email/type', controller.findAll);
};

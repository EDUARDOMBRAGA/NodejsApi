import { appName } from '../environment/index.js';
import * as crypto from '../utils/token';
export default app => {
	return {
		generating: (req, res, next) => {

			let user = {
				token: req.headers.authentication,
				userIp: req.ip.replace('::ffff:', '')
			};

			res.header("Content-Type", "application/json; charset=utf-8");

			res.locals.log = {
				loggedAt: new Date(),
				user: user,
				userIp: req.headers.Client || user.userIp,
				ipReq: user.userIp,
				application: appName,
				method: req.method + ' - ' + req.path,
				query: req.query !== undefined ? Object.keys(req.query).length ? req.query : null : null,
				body: req.body !== undefined ? Object.keys(req.body).length ? req.body : null : null
			};

			if (req.path.toLowerCase().indexOf('public') === -1) {
				if (!req.headers.authentication) {
					res.locals.log.httpCode = 401;
					res.locals.log.description = 'Operação não autorizada';
				}
				else {
					try {
						if (!user.token) {
							res.locals.log.httpCode = 401;
							res.locals.log.description = 'Token não localizado';
						}
						else {
							res.locals.log.token = crypto.decrypt(user.token);
						}
						// Após decidirmos como vai ser o token, aqui eu descriptografo e adiciono ao objeto user
					} catch (error) {
						res.locals.log.httpCode = 401;
						res.locals.log.description = 'Token inválido. ' + error;
					}
				}
			}

			//caso já houver algum erro na req, eu já gravo o log aqui
			if (res.locals.log.httpCode) {
				//enviar log

				return res.status(res.locals.log.httpCode).json({ message: res.locals.log.description })
			}

			next();
		},
	};
};


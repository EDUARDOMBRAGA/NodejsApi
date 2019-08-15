export default (req, res, next) => {
	if (!req.route) {
		res.status(404);
		res.json({
			urlChamada: req.path,
			metodo: req.method,
			mensagem: 'A URI não foi encontrada, favor contactar um administrador.',
		});
		res.locals.log.httpCode = 404;
		res.locals.log.description = 'Rota não encontrada';
	};
	next();
};

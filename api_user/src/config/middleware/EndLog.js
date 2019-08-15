module.exports = app => {
	return {
		ending: (req, res) => {
			if (res.locals.log.httpCode) {
				//enviar log
			};
		},
	};
};

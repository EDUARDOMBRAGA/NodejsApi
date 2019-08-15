export default (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authentication, Option, useremail, userpassword')
	res.header('Access-Control-Expose-Headers', 'Location')
	if (req.method === 'OPTIONS') {
		res.status(200).send()
		return
	}
	next()
}

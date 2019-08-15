import * as service from "./userAuth-service";

export { login };

async function login(req, res) {
  try {
    let result = await service.login(req.headers);

    res.json(result);
  } catch (ex) {
    res.status(500);
    res.json({
      message: ex.message,
      stack: ex.stack
    });
  }
}

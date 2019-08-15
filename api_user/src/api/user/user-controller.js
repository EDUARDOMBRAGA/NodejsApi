import * as service from "./user-service";
import { Joi, schemaValidation } from "./user-validation";

export {
  register,
  findAll,
  findByEmail,
  update,
  remove,
  recoverPassword,
  changePassword
};

async function register(req, res) {
  try {
    Joi.validate(req.body, schemaValidation.register, err => {
      if (err) {
        res.status(400);
        throw err;
      }
    });
    let result = await service.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.log(error.message);
    if (!res.statusCode || res.statusCode === 200)
      res.status(error.status ? error.status : 500);
    res.json(error);
  }
}

async function findAll(req, res) {
  try {
    Joi.validate(req.query, schemaValidation.findAll.query, err => {
      if (err) {
        res.status(400);
        throw err;
      }
    });
    let result = await service.findAll(req);
    res.json(result);
  } catch (error) {
    console.log(error.message);
    if (!res.statusCode || res.statusCode === 200)
      res.status(error.status ? error.status : 500);
    res.json(error);
  }
}

async function findByEmail(req, res) {
  try {
    Joi.validate(req.params, schemaValidation.findByMail, err => {
      if (err) {
        res.status(400);
        throw err;
      }
    });
    let result = await service.findByEmail(req.params.mail);
    res.json(result);
  } catch (error) {
    console.log(error.message);
    if (!res.statusCode || res.statusCode === 200)
      res.status(error.status ? error.status : 500);
    res.json(error);
  }
}

async function update(req, res) {
  try {
    Joi.validate(
      Object.assign(req.params, req.body),
      schemaValidation.update,
      err => {
        if (err) {
          res.status(400);
          throw err;
        }
      }
    );
    let result = await service.update(req.body, req.params.mail);
    res.json(result);
  } catch (error) {
    console.log(error.message);
    if (!res.statusCode || res.statusCode === 200)
      res.status(error.status ? error.status : 500);
    res.json(error);
  }
}

async function remove(req, res) {
  try {
    Joi.validate(req.params, schemaValidation.remove, err => {
      if (err) {
        res.status(400);
        throw err;
      }
    });
    let result = await service.remove(req.headers.userid, req.params.mail);
    res.json(result);
  } catch (error) {
    console.log(error.message);
    if (!res.statusCode || res.statusCode === 200)
      res.status(error.status ? error.status : 500);
    res.json(error);
  }
}

async function recoverPassword(req, res) {
  try {
    Joi.validate(req.params, schemaValidation.recoverPassword, err => {
      if (err) {
        res.status(400);
        throw err;
      }
    });
    let result = await service.recoverPassword(req.params.mail);
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    if (!res.statusCode || res.statusCode === 200)
      res.status(error.status ? error.status : 500);
    res.json(error);
  }
}

async function changePassword(req, res) {
  try {
    Joi.validate(
      Object.assign(req.params, req.body),
      schemaValidation.changePassword,
      err => {
        if (err) {
          res.status(400);
          throw err;
        }
      }
    );
    let result = await service.changePassword(req.params.mail, req.body);
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    if (!res.statusCode || res.statusCode === 200)
      res.status(error.status ? error.status : 500);
    res.json(error);
  }
}

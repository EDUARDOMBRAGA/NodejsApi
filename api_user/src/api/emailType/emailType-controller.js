import * as service from './emailType-service';

export {
  findAll,
};

async function findAll(req, res) {
  try {
    let result = await service.findAll(req.query);
    res.json(result);
  } catch (error) {
    console.log(error)
    if (!res.statusCode || res.statusCode === 200) res.status(error.status ? error.status : 500);
    res.json(error);
  };
};

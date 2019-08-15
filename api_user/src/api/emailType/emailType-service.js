import * as repository from './emailType-repository';

export {
  findAll,
};

async function findAll(search) {
  let result = await repository.findAll(search);
  if (result.length) {
    return {
      status: 200,
      message: 'Email types found.',
      users: result
    };
  } else {
    throw {
      status: 404,
      message: 'Nothing was found!',
    };
  };
};

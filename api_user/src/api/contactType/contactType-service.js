import * as repository from './contactType-repository';

export {
  findAll,
};

async function findAll(search) {
  let result = await repository.findAll(search);
  if (result.length) {
    return {
      status: 200,
      message: 'Contact types found.',
      users: result
    };
  } else {
    throw {
      status: 404,
      message: 'Nothing was found!',
    };
  };
};

import { sequelize } from '../../config/database';

export { findAll };

const { contacttype } = sequelize().models;

async function findAll(search) {
  let limit = null;
  let offset = null;

  if (search.limit && (search.offset || search.offset === 0)) {
    limit = parseInt(search.limit);
    offset = parseInt(search.offset);
  };

  return contacttype.findAll({
    distinct: true,
    offset: offset,
    limit: limit,
    raw: true
  });

};

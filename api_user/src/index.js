'user strict'

import './config/environment';
import Server from './config/server';
const debug = require('debug')('nodeapi:server');

Server.set('port', process.env.API_PORT);

Server.on('error', onError);
Server.on('listening', onListening);

Server.listen(process.env.API_PORT, () =>
  console.log(`Aplicação rodando na porta ${process.env.API_PORT}!`)
);

// Tratamento de erros no servidor
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe' + port : 'Port' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + 'require elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + 'is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

//debug
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
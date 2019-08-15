'use strict';

import './environment';
import Express, { urlencoded, json } from 'express';
import Dotenv from 'dotenv';
import * as Sentry from '@sentry/node';
import Cors from './middleware/Cors';
import NotFound from './middleware/NotFound';
import StartLog from './middleware/StartLog';
import EndLog from './middleware/EndLog';
import { registerRoutes } from './utils/routes';
Dotenv.config({ path: '.env-development' });

const server = Express();

Sentry.init({ dsn: process.env.SENTRY_DSN });

server.use(json({ limit: '5mb' }));
server.use(urlencoded({ extended: true }));
server.use(Cors);
server.use(StartLog(server).generating);
registerRoutes(server);
server.use(NotFound);
server.use(EndLog(server).ending);

//configurações sentry
server.use(Sentry.Handlers.requestHandler());
server.use(Sentry.Handlers.errorHandler());

export default server;
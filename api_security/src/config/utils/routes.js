import {userRoute} from '../../api/userAuth/userAuth-route';

export function registerRoutes(server) {
    userRoute(server);
}

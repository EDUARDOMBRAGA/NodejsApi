import { emailTypeRoute } from '../../api/emailType/emailType-route';
import { contactTypeRoute } from '../../api/contactType/contactType-route';
import { addressTypeRoute } from '../../api/addressType/addressType-route';
import { userRoute } from '../../api/user/user-route';

export function registerRoutes(server) {
  emailTypeRoute(server);
  contactTypeRoute(server);
  addressTypeRoute(server);
  userRoute(server);
}

import {routes} from '../config/routes';
export default class ConnectorRouteProvider {
    static boot(app) {
        routes(app);
    }
}
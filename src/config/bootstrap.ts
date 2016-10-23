import ConnectorRouteProvider from '../modules/connector/providers/route';

export const bootstrap = (app) => {
    ConnectorRouteProvider.boot(app);
}
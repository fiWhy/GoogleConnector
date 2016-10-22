import {ConnectorController} from '../modules/connector/controllers/connector';
export const routes = (app) => {
    app.get('/', ConnectorController.index);
    app.post('/file', ConnectorController.file);
}
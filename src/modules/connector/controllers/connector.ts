import {ConnectorService, IConnectorService} from '../services/connector';
import {BaseController} from '../../base/controllers/base';

class Connector extends BaseController {
    private connectorService: IConnectorService;
    constructor() {
        super();
        this.connectorService = new ConnectorService;
    }

    index = (req, res): void => {
        this.connectorService.getListOfFiles(req)
            .then(r => {
                res.json(r);
            }).catch(e => {
                this.sendError(res, 400, e);
            });
    }

    search = (req, res): void => {
         this.connectorService.searchFiles(req)
            .then(r => {
                res.json(r);
            }).catch(e => {
                this.sendError(res, 400, e);
            });
    }

    file = (req, res): void => {
         this.connectorService.getFile(req)
            .then(r => {
                res.json(r);
            }).catch(e => {
                this.sendError(res, 400, e);
            });
    }
}

export const ConnectorController = new Connector();
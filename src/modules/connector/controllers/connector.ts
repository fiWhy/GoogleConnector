import {ConnectorService, IConnectorService} from '../services/connector';

class Connector {
    private connectorService: IConnectorService;
    constructor() {
        this.connectorService = new ConnectorService;
    }

    index = (req, res): void => {
        this.connectorService.getListOfFiles(req)
            .then(r => {
                res.json(r);
            }).catch(e => {
                res.send(e);
            });
    }

    search = (req, res): void => {
         this.connectorService.searchFiles(req)
            .then(r => {
                res.json(r);
            }).catch(e => {
                res.send(e);
            });
    }

    file = (req, res): void => {
         this.connectorService.getFile(req)
            .then(r => {
                res.json(r);
            }).catch(e => {
                res.send(e);
            });
    }
}

export const ConnectorController = new Connector();
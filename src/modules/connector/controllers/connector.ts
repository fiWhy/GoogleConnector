import {ConnectorService, IConnectorService} from '../services/connector';

class Connector {
    private connectorService: IConnectorService;
    constructor() {
        this.connectorService = new ConnectorService;
    }

    login = (req, res): void => {

    }

    index = (req, res): void => {
        this.connectorService.getListOfFiles(req)
            .then(r => {
                console.log('have a response', r);
                res.json(r);
            }).catch(e => {
                res.send(e);
            })
    }

    search = (req, res): void => {
         this.connectorService.searchFiles(req)
            .then(r => {
                console.log('have a response', r);
                res.json(r);
            }).catch(e => {
                res.send(e);
            })
    }


    file = (req, res): void => {
         this.connectorService.getFile(req)
            .then(r => {
                console.log('have a response', r);
                res.json(r);
            }).catch(e => {
                res.send(e);
            })
    }
}

export const ConnectorController = new Connector();
import { GoogleClientService, IGoogleClientService } from '../../../libs/googleconnector/services/google.client';
import ApplicationTypes from '../../../libs/googleconnector/constants/application.types';
import Scopes from '../../../libs/googleconnector/constants/scopes';
import { config } from '../../../config/main';
const merge = require('deepmerge');

export interface IConnectorService {
    getListOfFiles(req);
    searchFiles(req);
    getFile(req);
}

export class ConnectorService implements IConnectorService {
    private connector: IGoogleClientService;
    constructor() {
        this.connector = new GoogleClientService;
        this.connector.setApplicationType(ApplicationTypes.Web);
        this.connector.pushScopes([
            Scopes.DRIVE_READONLY
        ]);
    }

    getFile(req) {
        return this.googleAuth(req.query.token).then(r => {
            return this.connector.api.getFile(req.body);
        })
    }

    getListOfFiles(req) {
        const options = {
            fields: 'nextPageToken, files(id, name, kind, mimeType)',
            spaces: 'drive'
        };

        const query = req.query;
        const request = merge(options, query);
        return this.googleAuth(req.query.token).then(r => {
            return this.connector.api.getFilesList(request);
        })

    }

    searchFiles(req) {
        const options = req.body;
        return this.googleAuth(req.query.token).then(r => {
            return this.connector.api.getFilesList(options);
        })
    }

    private googleAuth(token) {
        this.connector.setToken(token);
        return this.connector.authorize(config.drive)
    }
}
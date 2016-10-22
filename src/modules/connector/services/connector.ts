import { GoogleClientService, IGoogleClientService } from '../../../libs/googleconnector/services/google.client';
import { GoogleQuery, IGoogleQuery } from '../../../libs/googleconnector/services/google.query';
import { config } from '../../../config/main';
const merge = require('xtend');

export interface IConnectorService {
    getListOfFiles(req);
    searchFiles(req);
    getFile(req);
}

export class ConnectorService implements IConnectorService {
    private connector: IGoogleClientService;
    constructor() {
        this.connector = new GoogleClientService;
    }


    getFile(req) {
        const options = {
            fields: 'id, name, kind, mimeType, properties, modifiedTime',
            spaces: 'drive',
            mimeType: 'text/plain'
        };
        const exportData = req.query.export;
        return this.googleAuth(req.query.token).then(r => {
            const promises = [this.connector.api.getFile(req.body, req.query, options)];

            if(exportData) {
                promises.push(this.connector.api.exportFile(req.body, req.query, options));
            }
            
            return Promise.all(promises)
                    .then((data) => {
                        if(!exportData) {
                            return data[0];
                        } 

                        let withFullText = merge(
                            data[0],
                            {fullText: data[1] }
                        );

                        return withFullText;
                    });
        });
    }

    getListOfFiles(req) {
        const options = {
            fields: 'nextPageToken, files(id, name, kind, mimeType)',
            spaces: 'drive'
        };

        return this.googleAuth(req.query.token).then(r => {
            return this.connector.api.getFilesList(req.query, options);
        })
    }

    searchFiles(req) {
        const options = req.body;
        return this.googleAuth(req.query.token).then(r => {
            return this.connector.api.getFilesList(req.query, options);
        })
    }

    


    private googleAuth(token) {
        this.connector.setToken(token);
        return this.connector.authorize(config.drive)
    }
}
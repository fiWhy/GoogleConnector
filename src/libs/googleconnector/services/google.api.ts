import { GoogleQuery, IGoogleQuery } from './google.query';

const google = require('googleapis');
const merge = require('xtend');

export interface IGoogleApiService {
    setAuth(auth: any): void;
    getFilesList(query, options): Thenable<any>;
    getFile(body, query, options): Thenable<any>;
    exportFile(body, query, options): Thenable<any>;
}

export class GoogleApiService implements IGoogleApiService {
    private requestObject: any;
    private googleQueryService: IGoogleQuery;
    private service: any;

    constructor() {
        this.service = google.drive('v3');
        this.requestObject = {
        };
        this.googleQueryService = new GoogleQuery;
    }

    setAuth(auth: any) {
        this.requestObject.auth = auth;
    }

    getFilesList(query, options) {
        const request = merge(
            this.requestObject,
            options
        );
        request.q =  this.googleQueryService.getList(query).q;
        
        return new Promise((res, rej) => {
            this.service.files.list(request, function (err, response) {
                if (err) {
                    rej(err);
                } else {
                    res(response);
                }
            });
        })
    }

    getFile(body, query, options) {
        body.fileId = body.id;
        const request = merge(
            this.requestObject,
            options,
            body,
            query);

        return new Promise((res, rej) => {
            this.service.files.get(request, function (err, response) {
                if (err) {
                    rej(err);
                } else {
                    res(response);
                }
            });
        })
    }

    exportFile(body, query, options) {
        body.fileId = body.id;
        const request = merge(
            this.requestObject,
            body,
            options,
            query)
            
        return new Promise((res, rej) => {
            this.service.files.export(request, function (err, response) {
                if (err) {
                    rej(err);
                } else {
                    res(response);
                }
            });
        })
    }
}


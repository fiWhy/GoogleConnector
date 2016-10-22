const google = require('googleapis');
const merge = require('deepmerge');

export interface IGoogleApiService {
    setAuth(auth: any);
    getFilesList(options);
    getFile(options);
}

export class GoogleApiService implements IGoogleApiService {
    private requestObject: any;
    private service: any;

    constructor() {
        this.service = google.drive('v3');
        this.requestObject = {
        };
    }

    setAuth(auth: any) {
        this.requestObject.auth = auth;
    }

    getFilesList(options) {
        const request = merge(this.requestObject, options);
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

    getFile(options) {
       return new Promise((res, rej) => {
           this.service.files.get(options, function (err, response) {
                if (err) {
                    rej(err);
                } else {
                    console.log('Got file', response);
                    res(response);
                }
            });
        })
    }
}
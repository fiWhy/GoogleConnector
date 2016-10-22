import * as readline from 'readline';
import * as fs from 'fs';
import { ICredentials } from '../entities/credentials';
import ApplicationTypes from '../constants/application.types';

const GoogleAuth = require('google-auth-library');

export interface IGoogleAuthService {
    authorize(credentials: ICredentials, scopes: string[]);
    setTokenFileName(fileName: string): void;
    setTokenDir(dir: string): void;
    setToken(token: string): void;
    setApplicationType(applicationType: ApplicationTypes): void;
}

export class GoogleAuthService implements IGoogleAuthService {
    private tokenDir: string;
    private tokenFileName: string;
    private token: string;
    private applicationType: ApplicationTypes = ApplicationTypes.Console;


    setTokenFileName(fileName: string): void {
        this.tokenFileName = fileName;
    }

    setTokenDir(dir: string): void {
        this.tokenDir = dir;
    }

    setApplicationType(applicationType: ApplicationTypes): void {
        this.applicationType = applicationType;
    }

    setToken(token: string) {
        this.token = token;
    }

    authorize(credentials: ICredentials, scopes: string[]) {
        const auth = new GoogleAuth;
        return new Promise((res, rej) => {
            const oauth2Client = new auth.OAuth2(credentials.client_id, credentials.client_secret, credentials.redirect_uris[0]);
            if (this.tokenDir && this.tokenFileName) {
                return this.tryToGetCredentials()
                    .then(this.checkIsTokenExpiredAndRefresh)
                    .then(token => {
                        res(this.proceedOauthClient(oauth2Client, token));
                    })
                    .catch(err => {
                        this.getNewToken(oauth2Client, scopes)
                            .then(token => {
                                res(this.proceedOauthClient(oauth2Client, token));
                            })
                    });
            } else {
                return this.token?
                    res(this.proceedWebToken(oauth2Client, this.token)):
                    this.getNewToken(oauth2Client, scopes)
                    .then(token => {
                        res(this.proceedOauthClient(oauth2Client, token));
                    });
            }
        })
    }

    private tryToGetCredentials() {
        return this.getCredentialsFromFile();
    }

    private getCredentialsFromFile() {
         return new Promise((res, rej) => {
            fs.readFile(this.tokenFullPath, (err, data) => {
                if (err) {
                    rej(err);
                } else {
                    res(data.toString());
                }
            })
        })
    }

    private checkIsTokenExpiredAndRefresh(data: any): Thenable<any> {
        return new Promise((res, rej) => {
            const nowDate = new Date();
            const jsonData = JSON.parse(data);
            if(jsonData.expiry_date && (jsonData.expiry_date < nowDate.getTime())) {
                rej('Token expired');
            } else {
                res(data);
            }
        });
    }

    private getNewToken(oauth2Client, scopes): Thenable<any> {
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes
        });

         return this.getAndSetCredentialsForConsoleApplication(oauth2Client, authUrl);
    }

    private getAndSetCredentialsForConsoleApplication(oauth2Client, authUrl) {
        const self = this;
        return new Promise((res, rej) => {
            console.log('Authorize this app by visiting this url: ', authUrl);
            var rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question('Enter the code from that page here: ', function (code) {
                rl.close();
                oauth2Client.getToken(code, function (err, token) {
                    if (err) {
                        rej(err);
                        return;
                    }
                    if (self.tokenDir && self.tokenFileName) {
                        self.storeToken(token, self.proceedOauthClient.bind(this, oauth2Client, token));
                    } else {
                        self.proceedOauthClient(oauth2Client, token);
                    }

                    res(token);

                });
            });
        });
    }

    private proceedWebToken(client, token) {
        client.credentials = {};
        client.credentials.access_token = token;
        return client;
    }
    
    private proceedOauthClient(client, token): any {
        client.credentials = token;
        return client;
    }

    private storeToken(token, callback) {
        fs.mkdir(this.tokenDir, '0777', (err) => {
            if (err && err.code != 'EEXIST') {
                throw err;
            } else {
                fs.writeFile(this.tokenFullPath, JSON.stringify(token), callback);
            }
        });
    }

    get tokenFullPath() {
        return `${this.tokenDir}/${this.tokenFileName}`;
    }
}
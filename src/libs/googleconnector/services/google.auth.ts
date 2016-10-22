import * as readline from 'readline';
import * as fs from 'fs';
import { ICredentials } from '../entities/credentials';

const GoogleAuth = require('google-auth-library');

export interface IGoogleAuthService {
    authorize(credentials: ICredentials);
    setToken(token: string): void;
}

export class GoogleAuthService implements IGoogleAuthService {
    private tokenDir: string;
    private tokenFileName: string;
    private token: string;

    setToken(token: string) {
        this.token = token;
    }

    authorize(credentials: ICredentials) {
        const auth = new GoogleAuth;
        return new Promise((res, rej) => {
            const oauth2Client = new auth.OAuth2(credentials.client_id, credentials.client_secret, credentials.redirect_uris[0]);
            return this.token ?
                res(this.proceedWebToken(oauth2Client, this.token)) :
                rej('Token was not provided');
        })
    }

    private proceedWebToken(client, token) {
        client.credentials = {};
        client.credentials.access_token = token;
        return client;
    }
}
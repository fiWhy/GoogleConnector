import {IGoogleAuthService, GoogleAuthService} from './google.auth';
import {IGoogleApiService, GoogleApiService} from './google.api';
import {ICredentials, Credentials} from '../entities/credentials';
import ApplicationTypes from '../constants/application.types';
import Scopes from '../constants/scopes';
import {scopeList} from '../payload/scopes';

export interface IGoogleClientService {
    authorize(credentials: ICredentials): Thenable<string>;
    pushScopes(scopes: Scopes[]): void; 
    setTokenDir(dir: string): void;
    setTokenFileName(fileName: string): void;
    setToken(token: string);
    setApplicationType(applicationType: ApplicationTypes): void;
    api: IGoogleApiService;
    scopes: string[];
}

export class GoogleClientService implements IGoogleClientService {
    private _scopes: string[] = [];
    private authClient: any;
    private GoogleAuthService: IGoogleAuthService;
    private GoogleApiService: IGoogleApiService;

    constructor() {
        this.GoogleAuthService = new GoogleAuthService;
        this.GoogleApiService = new GoogleApiService;
    }

    setTokenDir(dir: string): void {
        this.GoogleAuthService.setTokenDir(dir);
    }

    setToken(token: string): void {
        this.GoogleAuthService.setToken(token);
    }

    setTokenFileName(fileName: string): void {
        this.GoogleAuthService.setTokenFileName(fileName);
    }

    setApplicationType(applicationType: ApplicationTypes): void {
        this.GoogleAuthService.setApplicationType(applicationType);
    }

    authorize(credentials: ICredentials): Thenable<string>  {
        if(!this._scopes.length)
            throw 'You need to set connector scope!';
    
            const preparedCredentials = new Credentials(credentials);
            return this.GoogleAuthService.authorize(preparedCredentials, this.scopes)
                .then(r => {
                    this.authClient = r;
                    this.GoogleApiService.setAuth(this.authClient);

                    return this.authClient;
                });
    }

    pushScopes(scopes: Scopes[]): void {
        scopes.forEach(s => {
            this._scopes.push(scopeList[s]);
        });
    }

    get api(): IGoogleApiService {
        if(!this.authClient) 
            throw 'You are not registered!';

        return this.GoogleApiService;
    }

    get scopes(): string[] {
        return this._scopes;
    }
}
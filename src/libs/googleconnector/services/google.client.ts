import {IGoogleAuthService, GoogleAuthService} from './google.auth';
import {IGoogleApiService, GoogleApiService} from './google.api';
import {ICredentials, Credentials} from '../entities/credentials';

export interface IGoogleClientService {
    authorize(credentials: ICredentials): Thenable<string>;
    setToken(token: string);
    api: IGoogleApiService;
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

    setToken(token: string): void {
        this.GoogleAuthService.setToken(token);
    }

    authorize(credentials: ICredentials): Thenable<string>  {
            const preparedCredentials = new Credentials(credentials);
            return this.GoogleAuthService.authorize(preparedCredentials)
                .then(r => {
                    this.authClient = r;
                    this.GoogleApiService.setAuth(this.authClient);

                    return this.authClient;
                });
    }

    get api(): IGoogleApiService {
        if(!this.authClient) 
            throw 'You are not registered!';

        return this.GoogleApiService;
    }
}
export interface ICredentials {
    installed: IInstalled;
    client_secret?: string;
    client_id?: string;
    redirect_uris?: string[];
}

interface IInstalled {
    client_secret: string;
    client_id: string;
    redirect_uris: string[];
}

export class Credentials implements IInstalled {
    installed: IInstalled;
    client_secret: string;
    client_id: string;
    redirect_uris: string[];
    constructor(credentials) {
        this.client_id = credentials.installed.client_id||credentials.client_id||0;
        this.client_secret = credentials.installed.client_secret||credentials.client_secret||0;
        this.redirect_uris = credentials.installed.redirect_uris||credentials.redirect_uris||[]
    }
}
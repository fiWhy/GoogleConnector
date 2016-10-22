export interface IQuery {
    q: string;
}

export class Query {
    q: string;
    constructor(query: string) {
        this.q = query;
    }
}
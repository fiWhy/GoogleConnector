import { Query, IQuery } from '../entities/query';

export interface IGoogleQuery {
    getList(query): IQuery;
}

export class GoogleQuery implements IGoogleQuery {
    public prepareMimeTypesQuery(query, beforeString) {
        if (query.ext) {
             if (beforeString) {
                beforeString += ' and ';
            }

            if (Array.isArray(query.ext)) { 
               beforeString = `mimeType contains "${query.ext.join('" or mimeType contains "')}"`;
            }
            else
               beforeString = `mimeType contains '${query.ext}'`;
        }

        return beforeString;

    }

    private prepareFolderQuery(query): string {
        return (query.folder?`"${query.folder}" in parents"`:'');
    }

    public getList(query): IQuery {
        let queryString = this.prepareFolderQuery(query);
        queryString = this.prepareMimeTypesQuery(query, queryString);
        return new Query(queryString);
    }
}
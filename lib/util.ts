
import * as mysql from 'mysql';

export class Util {

    public static getAffectedRows(query: mysql.Query): number {
        return JSON.parse(JSON.stringify(query)).affectedRows;
    }

}
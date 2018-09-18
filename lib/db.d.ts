import * as mysql from 'mysql';
export declare class DB {
    _conn: mysql.Connection;
    _isTransaction: boolean;
    _pool: mysql.Pool;
    _usePool: boolean;
    constructor(conn?: mysql.Connection);
    queryAsync(options: string, values: any): Promise<mysql.Query>;
    private _queryAsync;
    private _poolQueryAsync;
    static commitAsync(conn: mysql.Connection): Promise<void>;
}

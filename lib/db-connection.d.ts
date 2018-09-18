import * as mysql from 'mysql';
export declare class DBConnection {
    static createConnection(): mysql.Connection;
    static getConnectionConfig(host?: string, user?: string, password?: string, database?: string): {
        host: string;
        user: string;
        password: string;
        database: string;
    };
    static commitAsync(conn: mysql.Connection): Promise<void>;
}

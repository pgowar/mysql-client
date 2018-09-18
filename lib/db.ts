import * as mysql from 'mysql';
import { DBConnection } from './db-connection';
import { SingletonPoolClass } from './singleton-pool';

export class DB {

    _conn: mysql.Connection;
    _isTransaction: boolean = false;
    _pool: mysql.Pool;
    _usePool: boolean;

    constructor(conn: mysql.Connection = null) {

        this._conn = conn;

        if (!conn) {

            this._usePool = true;
            this._isTransaction = false;

            let poolConfig: mysql.PoolConfig = DBConnection.getConnectionConfig();
            this._pool = SingletonPoolClass.getInstance().getPool(poolConfig);

            if (this._isTransaction) {
                throw new Error('Cannot use transaction without providing connection');

            } else {
                this._conn = DBConnection.createConnection();
            }

        } else {
            this._isTransaction = true;
            this._usePool = false;

        }

    }


    public async queryAsync(options: string, values: any): Promise<mysql.Query> {

        /** Because we're using a pool directly, no explicit release is necessary. */
        try {

            if (this._usePool) {

                return this._poolQueryAsync(this._pool, options, values);

            } else {
                return this._queryAsync(this._conn, options, values);
            }

        } finally {

            if (!this._isTransaction) {

                if (!this._usePool) {

                    await this._conn.end();
                }
            }
        }
    }

    private async _queryAsync(conn: mysql.Connection, options: string, values: any): Promise<mysql.Query> {

        return new Promise<mysql.Query>(
            (resolve, reject) => {

                conn.query(options, values, function (err: mysql.MysqlError, rows: any) {
                    if (err) {
                        return reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            }
        );
    }

    private async _poolQueryAsync(pool: mysql.Pool, options: string, values: any): Promise<mysql.Query> {

        return new Promise<mysql.Query>(
            (resolve, reject) => {

                pool.query(options, values, function (err: mysql.MysqlError, rows: any) {
                    if (err) {
                        return reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            }
        );

    }

    public static async commitAsync(conn: mysql.Connection): Promise<void> {

        return new Promise<void>(
            (resolve, reject) => {
                conn.commit(function (err: mysql.MysqlError) {

                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            });
    }

}
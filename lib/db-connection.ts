import * as mysql from 'mysql';

export class DBConnection {

    public static createConnection(): mysql.Connection {
        return mysql.createConnection(this.getConnectionConfig());
    }

    public static getConnectionConfig(host: string = null, user: string = null, password: string = null, database: string = null) {

        if (!host) { host = process.env.DATABASE_HOST; }
        if (!user) { user = process.env.DATABASE_USERNAME; }
        if (!password) { password = process.env.DATABASE_PASSWORD; }
        if (!database) { database = process.env.DATABASE_NAME; }

        return {
            host: host,
            user: user,
            password: password,
            database: database
        };

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
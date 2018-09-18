

An opininated promised based MYSQL client using typescript.  


# Environment variables

DATABASE_HOST=xx
DATABASE_NAME=xx
DATABASE_USERNAME=xx
DATABASE_PASSWORD=xx

# Example usage

import * as dbclient from "mysql-client";

export class TokenLoggingDB {

    private db: dbclient.DB;

    constructor(conn: dbclient.DBConnection = null) {

        this.db = new dbclient.DB(conn);
    }

   public async isTokenBlackListed(jti: string): Promise<boolean> {

        const sql = "select jti from blacklisted_tokens where jti=?;";

        let rows: any = await this.db.queryAsync(sql, [jti]);

        return rows.length > 0;
    }
}
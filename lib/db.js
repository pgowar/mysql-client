"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_connection_1 = require("./db-connection");
const singleton_pool_1 = require("./singleton-pool");
class DB {
    constructor(conn = null) {
        this._isTransaction = false;
        this._conn = conn;
        if (!conn) {
            this._usePool = true;
            this._isTransaction = false;
            let poolConfig = db_connection_1.DBConnection.getConnectionConfig();
            this._pool = singleton_pool_1.SingletonPoolClass.getInstance().getPool(poolConfig);
            if (this._isTransaction) {
                throw new Error('Cannot use transaction without providing connection');
            }
            else {
                this._conn = db_connection_1.DBConnection.createConnection();
            }
        }
        else {
            this._isTransaction = true;
            this._usePool = false;
        }
    }
    queryAsync(options, values) {
        return __awaiter(this, void 0, void 0, function* () {
            /** Because we're using a pool directly, no explicit release is necessary. */
            try {
                if (this._usePool) {
                    return this._poolQueryAsync(this._pool, options, values);
                }
                else {
                    return this._queryAsync(this._conn, options, values);
                }
            }
            finally {
                if (!this._isTransaction) {
                    if (!this._usePool) {
                        yield this._conn.end();
                    }
                }
            }
        });
    }
    _queryAsync(conn, options, values) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                conn.query(options, values, function (err, rows) {
                    if (err) {
                        return reject(err);
                    }
                    else {
                        resolve(rows);
                    }
                });
            });
        });
    }
    _poolQueryAsync(pool, options, values) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                pool.query(options, values, function (err, rows) {
                    if (err) {
                        return reject(err);
                    }
                    else {
                        resolve(rows);
                    }
                });
            });
        });
    }
    static commitAsync(conn) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                conn.commit(function (err) {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            });
        });
    }
}
exports.DB = DB;

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
const mysql = require("mysql");
class DBConnection {
    static createConnection() {
        return mysql.createConnection(this.getConnectionConfig());
    }
    static getConnectionConfig(host = null, user = null, password = null, database = null) {
        if (!host) {
            host = process.env.DATABASE_HOST;
        }
        if (!user) {
            user = process.env.DATABASE_USERNAME;
        }
        if (!password) {
            password = process.env.DATABASE_PASSWORD;
        }
        if (!database) {
            database = process.env.DATABASE_NAME;
        }
        return {
            host: host,
            user: user,
            password: password,
            database: database
        };
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
exports.DBConnection = DBConnection;

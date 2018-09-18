"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Util {
    static getAffectedRows(query) {
        return JSON.parse(JSON.stringify(query)).affectedRows;
    }
}
exports.Util = Util;

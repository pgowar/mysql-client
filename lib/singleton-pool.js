"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class SingletonPoolClass {
    constructor() {
        if (SingletonPoolClass._instance) {
            throw new Error('Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.');
        }
        SingletonPoolClass._instance = this;
    }
    static getInstance() {
        if (!SingletonPoolClass._instance) {
            SingletonPoolClass._instance = new SingletonPoolClass();
        }
        return SingletonPoolClass._instance;
    }
    getPool(poolConfig) {
        if (!this._pool) {
            this._pool = mysql.createPool(poolConfig);
        }
        return this._pool;
    }
}
exports.SingletonPoolClass = SingletonPoolClass;

import * as mysql from 'mysql';
export declare class SingletonPoolClass {
    private static _instance;
    private _pool;
    constructor();
    static getInstance(): SingletonPoolClass;
    getPool(poolConfig: mysql.PoolConfig): mysql.Pool;
}

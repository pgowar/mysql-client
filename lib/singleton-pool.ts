import * as mysql from 'mysql';

export class SingletonPoolClass {

    private static _instance: SingletonPoolClass;

    private _pool: mysql.Pool;

    constructor() {

        if (SingletonPoolClass._instance) {
            throw new Error('Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.');
        }
        SingletonPoolClass._instance = this;
    }

    public static getInstance(): SingletonPoolClass {

        if (!SingletonPoolClass._instance) {
            SingletonPoolClass._instance = new SingletonPoolClass();
        }
        return SingletonPoolClass._instance;

    }

    public getPool(poolConfig: mysql.PoolConfig): mysql.Pool {

        if (!this._pool) {
            this._pool = mysql.createPool(poolConfig);
        }
        return this._pool;
    }
}



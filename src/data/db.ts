
import * as mongoose from 'mongoose';
import { Config } from '../config/config';

export class Database{
    
    private static _mongooseInstance: any;
    private static _mongooseConnection: mongoose.Connection;

    public static connect():mongoose.Connection{

        if (this._mongooseInstance) {
            return this._mongooseInstance;
        }

        this._mongooseConnection = mongoose.connection;

        this._mongooseConnection.once('open', () => {
            console.log("connected to the database");
        });

        const connectionString = Config.db_uri;
        console.log("The connection string is " + connectionString);

        this._mongooseInstance = mongoose.connect(connectionString,
            { 
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });
     
        return this._mongooseInstance;
    }
}
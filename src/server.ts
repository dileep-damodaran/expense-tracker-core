import * as http from "http";
import * as https from "https";
import { Config } from './config/config';
import { Database } from './data/db';
import { Bootstrap } from './helpers/bootstrap';
import { MiddleWareConfig } from './middlewares/middleWareConfig';

require("dotenv").config();
require("dotenv-safe").config();

Database.connect();
Bootstrap.initialize();

const middleWareConfig = new MiddleWareConfig();
let app = middleWareConfig.configure();

const PORT: number = Config.port;
const ENV:string = process.env.ENVIRONMENT;

console.log(`The environment is ${ENV}`);

let server;

if (process.env.SSL_ENABLED) {

    const sslOptions = {};
    server = https.createServer(sslOptions, app); 

  } else {
    server = http.createServer(app); 
  }

server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
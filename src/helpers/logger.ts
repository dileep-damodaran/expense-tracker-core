const winston = require('winston');
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';
const logLevel = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : "debug";


    const tsFormat = () => (new Date()).toLocaleTimeString();

    const logger = winston.createLogger(
        { 
        format: winston.format.combine(
             winston.format.errors({ stack: true }),
             winston.format.metadata(),
             winston.format.json()),
        transports: [

        // colorize the output to the console
        new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true,
            level: logLevel,
            handleExceptions: true
        }),

        new (require('winston-daily-rotate-file'))({
            filename: `${logDir}/.log`,
            timestamp: tsFormat,
            datePattern: 'dd-MM-yyyy',
            prepend: true,
            level: logLevel,
            handleExceptions: true,
            colorize: false
        })
    ],
    exitOnError: false,});

export default logger;


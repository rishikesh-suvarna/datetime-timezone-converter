import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Error transport
const errorTransport = new DailyRotateFile({
    dirname: 'logs/error',
    filename: 'error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: process.env.NODE_ENV === 'production' ? true : false,
    maxSize: '20m',
    maxFiles: '15d',
    level: 'error',
});

// Combined transport
const combinedTransport = new DailyRotateFile({
    dirname: 'logs/combined',
    filename: 'combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: process.env.NODE_ENV === 'production' ? true : false,
    maxSize: '20m',
    maxFiles: '15d',
});

// Logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `${timestamp} ${level.toUpperCase()}: ${message}`;
        })
      ),
    transports: [
        errorTransport,
        combinedTransport,
    ]
});

export default logger;
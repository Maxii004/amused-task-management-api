import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // Log level (e.g., 'info', 'error', 'debug')
  format: winston.format.combine(
    winston.format.timestamp(), // Add a timestamp to each log
    winston.format.json(), // Log in JSON format
  ),
  transports: [
    // Log to the console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Add colors to console logs
        winston.format.simple(), // Simple format for console logs
      ),
    }),
    // Log to a file
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Log only errors to a file
    new winston.transports.File({ filename: 'logs/combined.log' }), // Log everything to a file
  ],
});

export default logger;
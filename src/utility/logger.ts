import util from "util";
import winston from "winston";

const logConsoleFormat = winston.format.combine(
    winston.format.timestamp({ format: "HH:mm:ss" }),
    winston.format.splat(),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
        const metaValues = Object.values(meta);
        const data = metaValues.length === 1 ? metaValues[0] : meta;
        const isArray = Array.isArray(data);
        const inspectedData = util.inspect(data, {
            breakLength: isArray ? 80 : Infinity,
            colors: true,
            depth: null,
            showHidden: isArray,
        });
        const metaString = metaValues.length > 0
            ? `${isArray ? "\n" : " "}${inspectedData}`
            : "";

        return `[${timestamp}] ${level}: ${message}${metaString}`;
    }),
);

const logFileFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
);

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            format: logConsoleFormat,
        }),
        new winston.transports.File({ filename: "logs/error.log", level: "error", format: logFileFormat }),
        new winston.transports.File({ filename: "logs/combined.log", format: logFileFormat }),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: "logs/exceptions.log", format: logFileFormat }),
    ],

});

export default logger;

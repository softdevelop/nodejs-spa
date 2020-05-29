const moment = require('moment');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const { combine, timestamp, printf } = format;

const config = require('../../config')
const ROOT_PATH = config.ROOT;

const myFormat = printf(({ level, message, label = 'PSCD', timestamp }) => {
  return `${moment(timestamp).format('DD-MM-YYYY hh:mm:ss a')} [${label}] ${level.toUpperCase()}: ${message}`;
});

const createDailyLoggerTransport = ({ filename }) => {
  return createLogger({
    format: combine(
      timestamp(),
      myFormat
    ),
    transports: [
      new (transports.DailyRotateFile)({
        filename,
        datePattern: 'YYYY-MM-DD',
        // zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
      })
    ].concat(process.env.NODE_ENV === 'production' ? [] : [new transports.Console()])
  });
};

const systemLogger = createDailyLoggerTransport({
  filename: `${ROOT_PATH}/logs/system/%DATE%.log`
});

const mangopayLogger = createDailyLoggerTransport({
  filename: `${ROOT_PATH}/logs/mangopay/%DATE%.log`
});

const zegoLogger = createDailyLoggerTransport({
  filename: `${ROOT_PATH}/logs/zego/%DATE%.log`
});

const passbaseLogger = createDailyLoggerTransport({
  filename: `${ROOT_PATH}/logs/passbase/%DATE%.log`
});

module.exports = {
  systemLogger,
  mangopayLogger,
  zegoLogger,
  passbaseLogger
};

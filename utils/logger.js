const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new transports.File({
      filename: "syslog.log",
      level: "info",
    }),
    new transports.File({
      filename: "syslog.log",
      level: "error",
    }),
    new transports.File({
      filename: "syslog.log",
      level: "warn",
    }),
  ],
});

module.exports = logger;

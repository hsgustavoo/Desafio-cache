const chalk = require('chalk');

function requestLogger(req, res, next) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const method = req.method;
    const url = req.originalUrl;
    const status = res.statusCode;
    
    let statusColor;
    if (status >= 500) statusColor = chalk.red;
    else if (status >= 400) statusColor = chalk.yellow;
    else if (status >= 300) statusColor = chalk.cyan;
    else statusColor = chalk.green;
    
    console.log(`${chalk.blue(method.padEnd(7))} ${url} - ${statusColor(status)} ${duration}ms`);
  });
  
  next();
}

module.exports = requestLogger;
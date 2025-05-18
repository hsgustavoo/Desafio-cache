const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 30, checkperiod: 1 });

module.exports = cache;

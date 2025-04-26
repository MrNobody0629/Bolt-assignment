const NodeCache = require('node-cache');
// Initialize cache (TTL: 5 minutes)
const cache = new NodeCache({ stdTTL: 300 });

module.exports = {
    cache
};

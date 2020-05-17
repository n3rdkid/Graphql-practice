const authResolver = require('./auth');
const showResolver = require('./shows');
const rootResolver = {
  ...authResolver,
  ...showResolver
};

module.exports = rootResolver;
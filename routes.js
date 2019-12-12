const routes = require('next-routes')();


// structure of routes is the URL params, => the component you want to render at that route
routes
  .add('/ideas/new', '/ideas/new')
  .add('/ideas/:address', '/ideas/show')
  .add('/ideas/:address/requests', '/ideas/requests/index')
  .add('/ideas/:address/requests/new', '/ideas/requests/new');

module.exports = routes;

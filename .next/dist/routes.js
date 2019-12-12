'use strict';

var routes = require('next-routes')();

// structure of routes is the URL params, => the component you want to render at that route
routes.add('/ideas/new', '/ideas/new').add('/ideas/:address', '/ideas/show').add('/ideas/:address/requests', '/ideas/requests/index').add('/ideas/:address/requests/new', '/ideas/requests/new');

module.exports = routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy5qcyJdLCJuYW1lcyI6WyJyb3V0ZXMiLCJyZXF1aXJlIiwiYWRkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLFNBQVMsQUFBZjs7QUFHQTtBQUNBLE9BQ0csQUFESCxJQUNPLEFBRFAsY0FDcUIsQUFEckIsY0FFRyxBQUZILElBRU8sQUFGUCxtQkFFMEIsQUFGMUIsZUFHRyxBQUhILElBR08sQUFIUCw0QkFHbUMsQUFIbkMseUJBSUcsQUFKSCxJQUlPLEFBSlAsZ0NBSXVDLEFBSnZDOztBQU1BLE9BQU8sQUFBUCxVQUFpQixBQUFqQiIsImZpbGUiOiJyb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiQzoveGFtcHAvaHRkb2NzL0JhY2hlbG9yMjAxOS9ub2RlLWJvaWxlcnBsYXRlcy9zb2NpYWwtbWVkaWEifQ==
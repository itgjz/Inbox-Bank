const { createServer } = require('http');
const next = require('next');

const app = next({
  dev: process.env.NODE_ENV !== 'production',
});

const routes = require('./routes');
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  createServer(handler).listen(proccess.env.PORT || 3000, (err) => {
    if(err) throw err;
    console.log('Running on localhost:3000');
  });
});

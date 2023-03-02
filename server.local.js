
const port = 8080;

const server = require('./dist/server/main');

server.app().listen(port, () => {
  console.log("Listening on: http://localhost:"+port);
});

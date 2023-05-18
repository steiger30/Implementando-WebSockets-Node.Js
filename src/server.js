import { serverHttp } from "./http.js";
import "./websocket.js";
const port = 3000;
serverHttp.listen(port, function () {
  console.log(`Listening on port http://localhost:${port}/index.html`);
});

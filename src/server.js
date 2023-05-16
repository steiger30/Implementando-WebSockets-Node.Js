import { serverHttp } from "./http.js";
import "./websocket.js";

serverHttp.listen(3000, function () {
  console.log("Listening on port 3000");
});

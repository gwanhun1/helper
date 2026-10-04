import { endpoint } from "../server/http.js";
import { counsel } from "../server/counseling.js";
export default endpoint(["POST"], (req, uid) => counsel(uid, req.body || {}));

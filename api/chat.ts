import { endpoint } from "../server/http";
import { counsel } from "../server/counseling";
export default endpoint(["POST"], (req, uid) => counsel(uid, req.body || {}));
export const config = { maxDuration: 90 };

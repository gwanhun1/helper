import { endpoint, recordId, HttpError } from "../server/http.js";
import { changeVisibility, deleteRecord } from "../server/records.js";
export default endpoint(["PATCH", "DELETE"], async (req, uid) => {
  const id = recordId(req.body?.id);
  if (req.method === "DELETE") await deleteRecord(uid, id);
  else {
    if (typeof req.body?.open !== "boolean") throw new HttpError(400, "공개 설정을 확인해주세요.");
    await changeVisibility(uid, id, req.body.open);
  }
  return { success: true };
});

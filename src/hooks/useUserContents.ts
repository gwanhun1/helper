import { useState, useEffect, useCallback } from "react";
import { getDatabase, ref, onValue, get } from "firebase/database";
import { app } from "../firebaseConfig";
import useUserStore from "../store/userStore";
import { processContentsData } from "../utils/contentUtils";
import type { Item } from "./useContentsData";
const useUserContents = () => {
  const uid = useUserStore(state => state.user?.uid);
  const [state, setState] = useState<{ uid?: string; data: Item[]; loading: boolean; error: string | null }>({ data: [], loading: true, error: null });
  const refreshUserContents = useCallback(async () => {
    if (!uid) return;
    try { const snapshot = await get(ref(getDatabase(app), `privateRecords/${uid}`)); setState({ uid, data: processContentsData(snapshot.val()), loading: false, error: null }); }
    catch { setState(previous => ({ ...previous, loading: false, error: "기록을 불러오지 못했어요. 다시 시도해주세요." })); }
  }, [uid]);
  useEffect(() => {
    if (!uid) { setState({ data: [], loading: false, error: null }); return; }
    setState({ uid, data: [], loading: true, error: null });
    return onValue(ref(getDatabase(app), `privateRecords/${uid}`), snapshot => {
      setState({ uid, data: processContentsData(snapshot.val()), loading: false, error: null });
    }, () => setState({ uid, data: [], loading: false, error: "기록을 불러오지 못했어요. 다시 시도해주세요." }));
  }, [uid]);
  return { userContents: state.uid === uid ? state.data : [], loading: Boolean(uid) && (state.uid !== uid || state.loading), error: state.uid === uid ? state.error : null, refreshUserContents };
};
export default useUserContents;

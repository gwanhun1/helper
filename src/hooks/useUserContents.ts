import { useState, useEffect, useCallback, useRef } from "react";
import { getDatabase, ref, onValue, get } from "firebase/database";
import { app } from "../firebaseConfig";
import useUserStore from "../store/userStore";
import { processContentsData } from "../utils/contentUtils";
import type { Item } from "./useContentsData";

const loadError = "기록을 불러오지 못했어요. 다시 시도해주세요.";
const useUserContents = () => {
  const uid = useUserStore(state => state.user?.uid);
  const version = useRef({ value: 0 });
  const [state, setState] = useState<{
    uid?: string;
    data: Item[];
    loading: boolean;
    error: string | null;
  }>({ data: [], loading: true, error: null });

  const refreshUserContents = useCallback(async () => {
    if (!uid || useUserStore.getState().user?.uid !== uid) return;
    const requestVersion = ++version.current.value;
    const isCurrent = () => version.current.value === requestVersion &&
      useUserStore.getState().user?.uid === uid;
    setState(previous => ({ ...previous, uid, loading: true, error: null }));
    try {
      const snapshot = await get(ref(getDatabase(app), `privateRecords/${uid}`));
      if (isCurrent()) {
        setState({ uid, data: processContentsData(snapshot.val()), loading: false, error: null });
      }
    } catch {
      if (isCurrent()) {
        setState(previous => ({ ...previous, loading: false, error: loadError }));
      }
    }
  }, [uid]);

  useEffect(() => {
    let active = true;
    const tracker = version.current;
    ++version.current.value;
    setState({ uid, data: [], loading: Boolean(uid), error: null });
    const unsubscribe = uid ? onValue(
      ref(getDatabase(app), `privateRecords/${uid}`),
      snapshot => {
        if (!active || useUserStore.getState().user?.uid !== uid) return;
        ++version.current.value;
        setState({ uid, data: processContentsData(snapshot.val()), loading: false, error: null });
      },
      () => {
        if (!active || useUserStore.getState().user?.uid !== uid) return;
        ++version.current.value;
        setState({ uid, data: [], loading: false, error: loadError });
      },
    ) : undefined;
    return () => {
      active = false;
      ++tracker.value;
      unsubscribe?.();
    };
  }, [uid]);

  return {
    userContents: state.uid === uid ? state.data : [],
    loading: Boolean(uid) && (state.uid !== uid || state.loading),
    error: state.uid === uid ? state.error : null,
    refreshUserContents,
  };
};
export default useUserContents;

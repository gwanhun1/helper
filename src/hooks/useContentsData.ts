import { useEffect, useState, useCallback } from "react";
import {
  get,
  getDatabase,
  ref,
  onValue,
  query,
  orderByChild,
  limitToLast,
} from "firebase/database";
import { app } from "../firebaseConfig";
import { processContentsData } from "../utils/contentUtils";
export interface Comment {
  id?: string;
  content?: string;
  username?: string;
  date?: string;
  likes?: number;
  likedBy?: string[];
  userId?: string;
}
export interface Item {
  category?: string;
  content: string;
  date: string;
  id: string;
  response: string;
  username: string;
  timestamp: number;
  userId: string;
  open?: boolean;
  level?: number;
  moodSource?: string;
  comments?: Comment[];
  like?: number;
  likedBy?: string[];
  who?: string;
  how?: string;
}
const useContentsData = () => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(
    () =>
      query(
        ref(getDatabase(app), "publicContents"),
        orderByChild("date"),
        limitToLast(100),
      ),
    [],
  );
  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(
        processContentsData((await get(load())).val())
          .filter((item) => item.open === true)
          .reverse(),
      );
    } catch {
      setError("고민을 불러오지 못했어요. 연결을 확인하고 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }, [load]);
  useEffect(
    () =>
      onValue(
        load(),
        (snapshot) => {
          setData(
            processContentsData(snapshot.val())
              .filter((item) => item.open === true)
              .reverse(),
          );
          setLoading(false);
          setError(null);
        },
        () => {
          setError("고민을 불러오지 못했어요. 다시 시도해주세요.");
          setLoading(false);
        },
      ),
    [load],
  );
  return { data, loading, error, refreshData };
};
export default useContentsData;

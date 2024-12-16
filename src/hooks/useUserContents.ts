import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, get } from "firebase/database";
import { app } from "../firebaseConfig";
import useUserStore from "../store/userStore";
import { Item } from "./useContentsData";

interface UseUserContents {
  userContents: Item[];
  loading: boolean;
  error: string | null;
  refreshUserContents: () => Promise<void>;
}

const useUserContents = (): UseUserContents => {
  const user = useUserStore((state) => state.user);
  const [userContents, setUserContents] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const processUserContents = async (contentIds: string[]): Promise<Item[]> => {
    const db = getDatabase(app);
    
    if (!contentIds.length) {
      return [];
    }

    const contentsRef = ref(db, 'contents');
    const contentsSnapshot = await get(contentsRef);
    
    if (!contentsSnapshot.exists()) {
      return [];
    }

    const allContents = contentsSnapshot.val();
    
    return Object.values(allContents).filter((content): content is Item => 
      typeof content === 'object' && 
      content !== null && 
      'id' in content && 
      typeof content.id === 'string' &&
      contentIds.includes(content.id)
    );
};

  const fetchUserContents = async () => {
    if (!user?.uid) {      
      setUserContents([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const db = getDatabase(app);
      const userRef = ref(db, `users/${user.uid}`);
      const userSnapshot = await get(userRef);

      if (!userSnapshot.exists()) {
        setUserContents([]);
        return;
      }

      const userData = userSnapshot.val();
      const contentIds = userData.contentIds || [];
      
      const processedContents = await processUserContents(contentIds);
      setUserContents(processedContents);
    } catch (e) {
      console.log('Error fetching user contents:', e);
      setError(
        `사용자 컨텐츠를 가져오는 중 오류가 발생했습니다: ${
          e instanceof Error ? e.message : "알 수 없는 오류"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      setUserContents([]);
      return;
    }

    let mounted = true;
    const db = getDatabase(app);
    
    // 전체 데이터베이스 연결 확인
    const rootRef = ref(db);
    
    // 초기 로딩 상태 설정
    setLoading(true);
    
    get(rootRef).then((snapshot) => {
      const data = snapshot.val();
      
      // users 노드 구조 확인
      if (data.users && data.users.users) {
        // 중첩된 users 노드 사용
        const userRef = ref(db, `users/users/${user.uid}`);
        
        const unsubscribe = onValue(userRef, async (snapshot) => {
          if (!mounted) return;
          
          // 데이터 변경 시작시 로딩 상태 설정
          setLoading(true);
          
          try {
            if (!snapshot.exists()) {
              setUserContents([]);
              return;
            }

            const userData = snapshot.val();
            const contentIds = userData.contentIds || [];
            
            const processedContents = await processUserContents(contentIds);

            if (mounted) {
              setUserContents(processedContents);
            }
          } catch (error) {
            console.log('[DB] Error processing user data:', error);
            if (mounted) {
              setError(`사용자 컨텐츠를 가져오는 중 오류가 발생했습니다: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
            }
          } finally {
            if (mounted) {
              setLoading(false);
            }
          }
        });

        return () => {
          mounted = false;
          unsubscribe();
        };
      } else {
        // 원래 경로 사용
        const userRef = ref(db, `users/${user.uid}`);

        const unsubscribe = onValue(userRef, async (snapshot) => {
          if (!mounted) return;
          
          // 데이터 변경 시작시 로딩 상태 설정
          setLoading(true);
          
          try {
            if (!snapshot.exists()) {
              setUserContents([]);
              return;
            }
            const userData = snapshot.val();
            const contentIds = userData.contentIds || [];
            const processedContents = await processUserContents(contentIds);

            if (mounted) {
              setUserContents(processedContents);
            }
          } catch (error) {
            console.log('[DB] Error processing user data:', error);
            if (mounted) {
              setError(`사용자 컨텐츠를 가져오는 중 오류가 발생했습니다: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
            }
          } finally {
            if (mounted) {
              setLoading(false);
            }
          }
        });

        return () => {
          mounted = false;
          unsubscribe();
        };
      }
    }).catch((error) => {
      console.log('[DB] Database connection error:', error);
      if (mounted) {
        setError(`데이터베이스 연결 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
        setLoading(false);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  return { userContents, loading, error, refreshUserContents: fetchUserContents };
};

export default useUserContents;

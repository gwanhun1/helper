import { useEffect, useRef } from "react";
import useUserStore from "./store/userStore";
import useWorryStore from "./store/worryStore";
import useStepStore from "./store/stepStore";
import useSelectTreeStore from "./store/selectTreeStore";
import { Outlet } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import "./index.css";
import BottomNavigation from "./components/molecules/BottomNavigation";
import Nav from "./components/pages/Nav";
const App = () => {
  const { user, authReady } = useUserStore();
  const previousUid = useRef<string | undefined>();
  useEffect(() => {
    if (!authReady) return;
    if (previousUid.current && previousUid.current !== user?.uid) {
      useWorryStore.getState().reset();
      useStepStore.getState().reset();
      useSelectTreeStore.getState().reset();
    }
    previousUid.current = user?.uid;
  }, [user?.uid, authReady]);
  useEffect(() => {
    if (!user?.uid) return;
    const refresh = () => {
      if (document.visibilityState === "visible")
        void useUserStore.getState().refreshAccount();
    };
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    const timeout = user.nextResetAt
      ? setTimeout(
          refresh,
          Math.max(1000, user.nextResetAt - Date.now() + 1000),
        )
      : undefined;
    return () => {
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
      clearTimeout(timeout);
    };
  }, [user?.uid, user?.nextResetAt]);
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex justify-center w-full bg-slate-100 h-[100dvh]">
        <div className="flex overflow-hidden flex-col w-full bg-slate-50 md:shadow-lg max-w-[1040px] h-full">
          <a href="#main-content" className="skip-link">
            본문으로 바로가기
          </a>
          <Nav />
          <div className="flex flex-col md:flex-row flex-1 min-h-0">
            <main
              id="main-content"
              tabIndex={-1}
              className="order-1 md:order-2 flex-1 min-w-0 min-h-0 overflow-hidden flex flex-col"
            >
              <Outlet />
            </main>
            <div className="order-2 md:order-1 shrink-0 md:w-40">
              <BottomNavigation />
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
};
export default App;

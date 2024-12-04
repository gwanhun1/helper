import { useState, useMemo, useEffect } from "react";
import useSelectTreeStore from "../../store/selectTreeStore";
import treeImage from "../../assets/tree.png";
import selectTreeImage from "../../assets/selectTree.png";
import useLogData from "../../hooks/useLogData";
import { Item } from "../../hooks/useDateRankData";

const Forest = () => {
  const { data: forestData } = useLogData();
  const [selectedTreeIndex, setSelectedTreeIndex] = useState<number | null>(
    null
  );
  const [removingTreeIndex, setRemovingTreeIndex] = useState<number | null>(
    null
  );
  const [trees, setTrees] = useState<Item[]>([]);

  useEffect(() => {
    setTrees(forestData);
  }, [forestData]);

  // 나무 위치와 애니메이션 속성을 컴포넌트 마운트 시 한 번만 계산
  const treePositions = useMemo(() => {
    return trees.map(() => ({
      xPos: Math.random() * 80 + 10,
      yPos: Math.random() * 70 + 10,
      scale: Math.random() * 0.4 + 0.8,
      rotateAngle: Math.random() * 6 - 3,
      waveDelay: Math.random() * 4,
      waveDuration: 3 + Math.random() * 3,
      swayAmount: Math.random() * 3 + 1,
    }));
  }, [trees.length]);

  const handleTreeClick = (index: number, treeData: Item) => {
    setSelectedTreeIndex(selectedTreeIndex === index ? null : index);
    if (treeData) {
      useSelectTreeStore.getState().select(treeData);
    }
  };

  // 트리 삭제 애니메이션 및 처리
  useEffect(() => {
    const prevLength = trees.length;
    if (forestData.length < prevLength) {
      // 삭제된 트리 찾기
      const removedTreeIndex = trees.findIndex(
        (tree) => !forestData.some((newTree) => newTree.id === tree.id)
      );
      if (removedTreeIndex !== -1) {
        setRemovingTreeIndex(removedTreeIndex);
        // 애니메이션 후 실제 데이터 업데이트
        setTimeout(() => {
          setTrees(forestData);
          setRemovingTreeIndex(null);
          setSelectedTreeIndex(null);
        }, 500);
      }
    } else {
      setTrees(forestData);
    }
  }, [forestData]);

  return (
    <div className="relative w-full h-[400px] bg-gradient-to-b from-sky-200 via-sky-100 to-green-100 overflow-hidden">
      {/* 배경 구름 효과 */}
      <div className="absolute w-full h-full">
        <div className="cloud-1"></div>
        <div className="cloud-2"></div>
        <div className="cloud-3"></div>
      </div>

      {trees.map((tree, index) => {
        const position = treePositions[index];
        const isRemoving = removingTreeIndex === index;

        return (
          <div
            key={tree.id}
            className={`absolute transition-all duration-500 ease-in-out group
              ${selectedTreeIndex === index ? "z-10" : ""}
              ${isRemoving ? "opacity-0 scale-0 rotate-90 translate-y-10" : ""}
            `}
            style={
              {
                left: `${position.xPos}%`,
                top: `${position.yPos}%`,
                width: "40px",
                height: "40px",
                transform: `scale(${position.scale}) rotate(${position.rotateAngle}deg)`,
                animation: `treeWave ${
                  position.waveDuration
                }s infinite ease-in-out, 
                         treeSway ${
                           position.waveDuration * 1.5
                         }s infinite ease-in-out`,
                animationDelay: `${position.waveDelay}s`,
                "--sway-amount": `${position.swayAmount}deg`,
              } as React.CSSProperties
            }
          >
            <img
              src={selectedTreeIndex === index ? selectTreeImage : treeImage}
              alt={`나무 ${index + 1}`}
              className={`w-full h-full object-contain transition-all duration-300 cursor-pointer
                ${selectedTreeIndex === index ? "scale-125" : "hover:scale-110"}
              `}
              onClick={(e) => {
                e.stopPropagation();
                handleTreeClick(index, tree);
              }}
            />
          </div>
        );
      })}

      <style>
        {`
          @keyframes treeWave {
            0%, 100% { transform: translateY(0) rotate(var(--rotate-angle)); }
            50% { transform: translateY(-5px) rotate(calc(var(--rotate-angle) + var(--sway-amount))); }
          }

          @keyframes treeSway {
            0%, 100% { transform: rotate(calc(var(--rotate-angle) - var(--sway-amount))); }
            50% { transform: rotate(calc(var(--rotate-angle) + var(--sway-amount))); }
          }

          .cloud-1, .cloud-2, .cloud-3 {
            position: absolute;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50px;
            filter: blur(10px);
          }

          .cloud-1 {
            width: 100px;
            height: 40px;
            left: 10%;
            top: 20%;
            animation: cloudFloat 20s infinite linear;
          }

          .cloud-2 {
            width: 150px;
            height: 50px;
            left: 40%;
            top: 10%;
            animation: cloudFloat 25s infinite linear;
          }

          .cloud-3 {
            width: 120px;
            height: 45px;
            left: 70%;
            top: 15%;
            animation: cloudFloat 22s infinite linear;
          }

          @keyframes cloudFloat {
            from { transform: translateX(-100%); }
            to { transform: translateX(1000px); }
          }
        `}
      </style>
    </div>
  );
};

export default Forest;

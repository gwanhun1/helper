import { useState, useEffect, useRef } from "react";
import useSelectTreeStore from "../../store/selectTreeStore";
import treeImage from "/tree.png";
import selectTreeImage from "/selectTree.png";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import useWorryData, { Item } from "../../hooks/useWorryData";

const Forest = () => {
  const { data: forestData } = useWorryData();
  const [selectedTreeIndex, setSelectedTreeIndex] = useState<number | null>(
    null
  );
  const [removingTreeIndex, setRemovingTreeIndex] = useState<number | null>(
    null
  );
  const prevTreesRef = useRef<Item[]>([]);
  const treePositionsMap = useRef(new Map()).current;
  const navigate = useNavigate();

  // 글자 수를 기반으로 한 더 큰 크기 조정
  const calculateTreeScale = (level: number = 3) => {
    return 1 + (level - 1) * 0.2; // 기본 크기 1에 레벨당 20% 추가
  };

  // 두 위치 사이의 거리를 계산하는 함수
  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  };

  // 위치가 다른 나무들과 충분히 떨어져 있는지 확인
  const isPositionValid = (x: number, y: number, scale: number, existingPositions: Array<{x: number, y: number, scale: number}>) => {
    const minDistance = 25; // 최소 거리 설정
    return existingPositions.every(pos => {
      const requiredDistance = minDistance * (scale + pos.scale) / 2; // 두 나무의 크기를 고려한 최소 거리
      const actualDistance = calculateDistance(x, y, pos.x, pos.y);
      return actualDistance > requiredDistance;
    });
  };

  // 나무 위치와 애니메이션 속성을 각 나무의 ID와 연결
  const getTreePosition = (treeId: string, level: number = 3) => {
    if (!treePositionsMap.has(treeId)) {
      const scale = calculateTreeScale(level);
      const horizontalMargin = 10 * scale;
      const verticalMargin = 20 * scale;
      
      // 기존 나무들의 위치 수집
      const existingPositions = Array.from(treePositionsMap.values()).map(pos => ({
        x: pos.xPos,
        y: pos.yPos,
        scale: pos.scale
      }));

      // 최대 시도 횟수 설정
      const maxAttempts = 50;
      let attempts = 0;
      let newX, newY;

      // 적절한 위치를 찾을 때까지 반복
      do {
        newX = Math.random() * (90 - horizontalMargin) + 5;
        newY = Math.random() * (100 - verticalMargin * 2) + verticalMargin;
        attempts++;
      } while (!isPositionValid(newX, newY, scale, existingPositions) && attempts < maxAttempts);

      treePositionsMap.set(treeId, {
        xPos: newX,
        yPos: newY,
        scale: scale,
        rotateAngle: Math.random() * 6 - 3,
        waveDelay: Math.random() * 4,
        waveDuration: 3 + Math.random() * 3,
        swayAmount: Math.random() * 3 + 1,
      });
    }
    return treePositionsMap.get(treeId);
  };

  const handleTreeClick = (index: number, treeData: Item) => {
    setSelectedTreeIndex(selectedTreeIndex === index ? null : index);
    if (treeData) {
      useSelectTreeStore.getState().select(treeData);
    }
  };

  useEffect(() => {
    const prevTrees = prevTreesRef.current;
    if (prevTrees.length > forestData.length) {
      const removedIndex = prevTrees.findIndex(
        (prevTree) => !forestData.some((newTree) => newTree.id === prevTree.id)
      );

      if (removedIndex !== -1) {
        setRemovingTreeIndex(removedIndex);
        setTimeout(() => {
          setRemovingTreeIndex(null);
          setSelectedTreeIndex(null);
        }, 500);
      }
    }
    prevTreesRef.current = forestData;
  }, [forestData]);

  const handleNavigate = () => {
    navigate("/Worry");
  };

  if (!forestData || !Array.isArray(forestData)) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-md mb-3 text-gray-500 mt-5">
          고민이 없으십니다. 👍
        </div>
        <div className="text-sm mb-3 text-gray-400">
          상담을 받으러 이동하실까요?
        </div>
        <Button text="이동하기" bgColor="bg-green" onPress={handleNavigate} />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-40 overflow-hidden 
      border border-white/60 bg-slate-100
      shadow-[0_2px_8px_rgba(0,0,0,0.12),inset_0_1px_3px_rgba(255,255,255,0.95)]
      bg-gradient-to-b from-white/15 to-transparent"
    >
      {forestData.length > 0 &&
        forestData.map((tree, index) => {
          const position = getTreePosition(tree.id, tree.level);
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
    </div>
  );
};

export default Forest;

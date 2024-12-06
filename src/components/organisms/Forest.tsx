import { useState, useEffect, useRef } from "react";
import useSelectTreeStore from "../../store/selectTreeStore";
import treeImage from "/tree.png";
import selectTreeImage from "/selectTree.png";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import useWorryData, { Item } from "../../hooks/useWorryData";

const Forest = () => {
  const { data: forestData } = useWorryData();
  const [selectedTreeIndex, setSelectedTreeIndex] = useState<number | null>(null);
  const [removingTreeIndex, setRemovingTreeIndex] = useState<number | null>(null);
  const prevTreesRef = useRef<Item[]>([]);
  const treePositionsMap = useRef(new Map()).current;
  const navigate = useNavigate();

  // 글자 수를 기반으로 한 더 큰 크기 조정
  const calculateTreeScale = (level: number = 3) => {
    return 1 + ((level - 1) * 0.2); // 기본 크기 1에 레벨당 20% 추가
  };

  // 나무 위치와 애니메이션 속성을 각 나무의 ID와 연결
  const getTreePosition = (treeId: string, level: number = 3) => {
    if (!treePositionsMap.has(treeId)) {
      treePositionsMap.set(treeId, {
        xPos: Math.random() * 80 + 10,
        yPos: Math.random() * 70 + 10,
        scale: calculateTreeScale(level),
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
    navigate('/Worry')
  }

  if (!forestData || !Array.isArray(forestData)) {
    return <div className="flex flex-col items-center justify-center h-full">
      <div className="text-md mb-3 text-gray-500 mt-5">고민이 없으십니다. 👍</div>
      <div className="text-sm mb-3 text-gray-400">상담을 받으러 이동하실까요?</div>
      <Button
          text="이동하기"
          bgColor="bg-green-400"
          onPress={handleNavigate}
        />
      </div>;
  }

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {forestData.length > 0 && forestData.map((tree, index) => {
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
                animation: `treeWave ${position.waveDuration}s infinite ease-in-out, 
                         treeSway ${position.waveDuration * 1.5}s infinite ease-in-out`,
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

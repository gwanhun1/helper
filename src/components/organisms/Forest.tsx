import { useState, useEffect, useRef } from "react";
import useSelectTreeStore from "../../store/selectTreeStore";
import treeImage from "/tree.png";
import selectTreeImage from "/selectTree.png";
import useLogData from "../../hooks/useLogData";
import { Item } from "../../hooks/useDateRankData";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";

const Forest = () => {
  const { data: forestData } = useLogData();
  const [selectedTreeIndex, setSelectedTreeIndex] = useState<number | null>(null);
  const [removingTreeIndex, setRemovingTreeIndex] = useState<number | null>(null);
  const prevTreesRef = useRef<Item[]>([]);
  const treePositionsMap = useRef(new Map()).current;
  const navigate = useNavigate();

  // 화면 크기에 따른 나무 크기 조정
  const calculateTreeScale = (response: string) => {
    const baseScale = window.innerWidth < 768 ? 0.8 : 1; // 모바일에서는 더 작게
    return baseScale + (response.length * 0.003); // 글자당 0.3% 추가
  };

  // 나무 위치와 애니메이션 속성을 각 나무의 ID와 연결
  const getTreePosition = (treeId: string, response: string) => {
    if (!treePositionsMap.has(treeId)) {
      const isMobile = window.innerWidth < 768;
      const padding = isMobile ? 15 : 10; // 모바일에서는 더 많은 여백

      treePositionsMap.set(treeId, {
        xPos: Math.random() * (100 - 2 * padding) + padding,
        yPos: Math.random() * (80 - 2 * padding) + padding,
        scale: calculateTreeScale(response),
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

  // 화면 크기 변경 시 나무 위치 재계산
  useEffect(() => {
    const handleResize = () => {
      treePositionsMap.clear();
      setSelectedTreeIndex(null);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigate = () => {
    navigate('/Worry')
  }

  if (!forestData || !Array.isArray(forestData)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <div className="text-lg md:text-xl mb-4 text-gray-500">고민이 없으십니다. 👍</div>
        <div className="text-sm md:text-base mb-4 text-gray-400">상담을 받으러 이동하실까요?</div>
        <Button
          text="이동하기"
          bgColor="bg-green-400"
          onPress={handleNavigate}
          className="min-w-[120px] md:min-w-[160px]"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-gradient-to-b from-green-50 to-white">
      {forestData.length > 0 && forestData.map((tree, index) => {
        const position = getTreePosition(tree.id, tree.response);
        const isRemoving = removingTreeIndex === index;
        const isSelected = selectedTreeIndex === index;

        return (
          <div
            key={tree.id}
            onClick={() => handleTreeClick(index, tree)}
            className={`
              absolute transition-all duration-500 ease-in-out
              cursor-pointer select-none
              ${isSelected ? "z-10 scale-110" : "hover:scale-105"}
              ${isRemoving ? "opacity-0 scale-0 rotate-90 translate-y-10" : ""}
            `}
            style={{
              left: `${position.xPos}%`,
              top: `${position.yPos}%`,
              width: "40px",
              height: "40px",
              transform: `
                scale(${position.scale}) 
                rotate(${position.rotateAngle}deg)
              `,
              animation: `
                treeWave ${position.waveDuration}s infinite ease-in-out,
                treeSway ${position.waveDuration * 1.5}s infinite ease-in-out
              `,
              animationDelay: `${position.waveDelay}s`,
            }}
          >
            <img
              src={isSelected ? selectTreeImage : treeImage}
              alt="Tree"
              className="w-full h-full object-contain"
              draggable="false"
            />
            {isSelected && (
              <div className="
                absolute top-full left-1/2 transform -translate-x-1/2 mt-2
                bg-white p-3 rounded-lg shadow-lg
                min-w-[200px] md:min-w-[300px]
                text-sm md:text-base
                whitespace-pre-wrap
                z-20
              ">
                <p className="font-medium mb-2">{tree.content}</p>
                <p className="text-gray-600">{tree.response}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Forest;

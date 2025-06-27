import { useState } from "react";

const grid = 50;

type ChildrenType = {
  isAddShapeSelected: boolean;
  shapeIndex: {
    startx: string;
    starty: string;
    endx: string;
    endy: string;
  };
  setShapeIndex: React.Dispatch<
    React.SetStateAction<{
      startx: string;
      starty: string;
      endx: string;
      endy: string;
    }>
  >;
  gridsRef: React.RefObject<HTMLDivElement | null>;
  color: string;
};

const PaintGrids = ({
  isAddShapeSelected,
  shapeIndex,
  setShapeIndex,
  gridsRef,
  color,
}: ChildrenType) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const arrayGrids = [];
  for (let i = 0; i < grid; i++) {
    for (let j = 0; j < grid; j++) {
      arrayGrids.push(
        <div
          key={`${i},${j}`}
          draggable={false}
          id={`${i},${j}`}
          style={{ backgroundColor: "white" }}
        ></div>
      );
    }
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isAddShapeSelected) {
      const divElement = event.target as HTMLDivElement;
      const [startx, starty] = divElement.id.split(",");
      setShapeIndex({ startx, starty, endx: "", endy: "" });
    }
    setIsMouseDown(true);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown) return;
    if (isAddShapeSelected) {
      const element = event.target as HTMLDivElement;
      const [endx, endy] = element.id.split(",");
      setShapeIndex({ ...shapeIndex, endx, endy });
    } else {
      const target = event.target as HTMLDivElement;
      target.style.backgroundColor = color;
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isAddShapeSelected) {
      const divElement = event.target as HTMLDivElement;
      const [endx, endy] = divElement.id.split(",");
      setShapeIndex({ ...shapeIndex, endx, endy });
    }
    setIsMouseDown(false);
  };
  return (
    <>
      <h1>Paint Application</h1>
      <div
        className={`grid-wrapper ${isAddShapeSelected ? "cursor-change" : ""}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={gridsRef}
      >
        {arrayGrids}
      </div>
    </>
  );
};

export default PaintGrids;

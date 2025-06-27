import { useEffect, useState } from "react";
import { usePreviousValue } from "../hooks/usePreviousValue";

type ChildrenType = {
  setIsAddShapeSelected: React.Dispatch<React.SetStateAction<boolean>>;
  shapeIndex: {
    startx: string;
    starty: string;
    endx: string;
    endy: string;
  };
  gridsRef: React.RefObject<HTMLDivElement | null>;
  isAddShapeSelected: boolean;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
};

const PaintButtons = ({
  setIsAddShapeSelected,
  shapeIndex,
  gridsRef,
  isAddShapeSelected,
  color,
  setColor,
}: ChildrenType) => {
  const prevColor: string | null = usePreviousValue(color);

  const [isErase, setIsErase] = useState(false);

  const handleErase = () => {
    setIsErase(!isErase);
    setIsAddShapeSelected(false);

    if (isErase && prevColor) {
      setColor(prevColor);
    } else setColor("white");
  };

  const handleFill = () => {
    if (!gridsRef.current) return;
    gridsRef.current.childNodes.forEach((grid: ChildNode) => {
      (grid as HTMLDivElement).style.backgroundColor = color;
    });
  };

  const handleClear = () => {
    if (!gridsRef.current) return;
    gridsRef.current.childNodes.forEach((grid: ChildNode) => {
      (grid as HTMLDivElement).style.backgroundColor = "white";
    });
  };

  const createBorder = () => {
    if (shapeIndex.endx === "" && shapeIndex.endy === "") return;
    if (!gridsRef.current) return;
    if (!isAddShapeSelected) return;

    gridsRef.current.childNodes.forEach((grid: ChildNode) => {
      const cellElement = grid as HTMLDivElement;
      const [x, y] = cellElement.id.split(",");

      const minX = Math.min(+shapeIndex.startx, +shapeIndex.endx);
      const maxX = Math.max(+shapeIndex.startx, +shapeIndex.endx);
      const minY = Math.min(+shapeIndex.starty, +shapeIndex.endy);
      const maxY = Math.max(+shapeIndex.starty, +shapeIndex.endy);

      const conditionInclusive =
        +x >= minX && +x <= maxX && +y >= minY && +y <= maxY;
      const conditionBorder =
        +x === minX || +x === maxX || +y === minY || +y === maxY;

      if (conditionInclusive && conditionBorder) {
        cellElement.style.backgroundColor = color;
      } else if (conditionInclusive && !conditionBorder) {
        cellElement.style.backgroundColor = "white";
      }
    });
  };

  useEffect(() => {
    createBorder();
  }, [shapeIndex.endx, shapeIndex.endy]);

  return (
    <>
      <div className="buttons-wrapper">
        <input
          type="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          disabled={isErase}
        />
        <button type="button" className="button" onClick={handleFill}>
          Fill
        </button>
        <button type="button" className="button" onClick={handleClear}>
          Clear
        </button>
        <button
          type="button"
          className={`button ${isAddShapeSelected ? "button-selected" : ""}`}
          onClick={() => setIsAddShapeSelected(!isAddShapeSelected)}
        >
          Add Shape
        </button>
        <button
          type="button"
          className={`button ${isErase ? "button-selected" : ""}`}
          onClick={handleErase}
        >
          Erase
        </button>
      </div>
    </>
  );
};

export default PaintButtons;

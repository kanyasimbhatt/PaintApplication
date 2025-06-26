import { useEffect, useRef, useState } from "react";
import "./App.css";
import { usePreviousValue } from "./hooks/usePreviousValue";

const grid = 50;

function App() {
  const [color, setColor] = useState<string>("black");
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isErase, setIsErase] = useState(false);
  const [isAddShapeSelected, setIsAddShapeSelected] = useState(false);
  const [shapeIndex, setShapeIndex] = useState({
    startx: "",
    starty: "",
    endx: "",
    endy: "",
  });
  const gridsRef = useRef<HTMLDivElement>(null);
  const prevColor: string | null = usePreviousValue(color);

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

  const handleErase = () => {
    setIsErase(!isErase);
    setIsAddShapeSelected(false);

    if (isErase && prevColor) {
      setColor(prevColor);
    } else setColor("white");
  };

  const arrayGrids = [];
  for (let i = 0; i < grid; i++) {
    for (let j = 0; j < grid; j++) {
      arrayGrids.push(
        <div key={`${i},${j}`} draggable={false} id={`${i},${j}`}></div>
      );
    }
  }

  const createBorder = () => {
    if (shapeIndex.endx === "" && shapeIndex.endy === "") return;
    if (!gridsRef.current) return;
    if (!isAddShapeSelected) return;

    gridsRef.current.childNodes.forEach((grid: ChildNode) => {
      const [x, y] = (grid as HTMLDivElement).id.split(",");

      const minX = Math.min(+shapeIndex.startx, +shapeIndex.endx);
      const maxX = Math.max(+shapeIndex.startx, +shapeIndex.endx);
      const minY = Math.min(+shapeIndex.starty, +shapeIndex.endy);
      const maxY = Math.max(+shapeIndex.starty, +shapeIndex.endy);

      const conditionInclusive =
        +x >= minX && +x <= maxX && +y >= minY && +y <= maxY;
      const conditionBorder =
        +x === minX || +x === maxX || +y === minY || +y === maxY;

      if (conditionInclusive && conditionBorder) {
        (grid as HTMLDivElement).style.backgroundColor = color;
      } else if (conditionInclusive && !conditionBorder) {
        (grid as HTMLDivElement).style.backgroundColor = "white";
      }
    });
  };

  useEffect(() => {
    createBorder();
  }, [shapeIndex.endx, shapeIndex.endy]);

  return (
    <div className="main-body">
      {prevColor}
      <div className="grid-input-wrapper">
        <h1>Paint Application</h1>
        <div
          className={`grid-wrapper ${
            isAddShapeSelected ? "cursor-change" : ""
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          ref={gridsRef}
        >
          {arrayGrids}
        </div>
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
      </div>
    </div>
  );
}

export default App;

import { useRef, useState } from "react";
import "./App.css";
import PaintGrids from "./components/PaintGrids";
import PaintButtons from "./components/PaintButtons";

function App() {
  const [color, setColor] = useState<string>("black");
  const [isAddShapeSelected, setIsAddShapeSelected] = useState(false);
  const [shapeIndex, setShapeIndex] = useState({
    startx: "",
    starty: "",
    endx: "",
    endy: "",
  });
  const gridsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="main-body">
      <div className="grid-input-wrapper">
        <PaintGrids
          isAddShapeSelected={isAddShapeSelected}
          shapeIndex={shapeIndex}
          setShapeIndex={setShapeIndex}
          gridsRef={gridsRef}
          color={color}
        />

        <PaintButtons
          setIsAddShapeSelected={setIsAddShapeSelected}
          shapeIndex={shapeIndex}
          gridsRef={gridsRef}
          isAddShapeSelected={isAddShapeSelected}
          color={color}
          setColor={setColor}
        />
      </div>
    </div>
  );
}

export default App;

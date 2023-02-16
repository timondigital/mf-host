import React from "react";
import ReactDOM from "react-dom";
import ColorPicker from "colorPicker/ColorPicker";
import ColorList from "colorList/ColorList";

import { useColors } from "colorPicker/useColors";
import "./index.css";

const App = () => {
  const { color, colorList, handleChangeColor, handleSaveColor } = useColors();
  return (
    <div className="container">
      <header>
        <h1>App color picker con Micro Frontend </h1>
        <h3>Module Federation</h3>
      </header>
      <ColorList colorList={colorList} />
      <ColorPicker
        color={color}
        handleChangeColor={handleChangeColor}
        handleSaveColor={handleSaveColor}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

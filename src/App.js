import "./App.css";
import Toolbar from "./components/Toolbar";
import React from "react";
class App extends React.Component {
  constructor(props) {
    super(props);
    window.onload = () => {
      console.log("initialize paper and tools");
    };
    this.state = {
      // tools=[new Pencil(),new Polygon(),new Eraser(),new Shadow()]
      tools: [
        {
          config: {
            name: "sketch",
            modifiers: {
              color: ["color", "red"],
              width: ["width", 2],
              flow: ["flow", "smooth"], //line//normal//mouse friendly
            },
          },
        },
        {
          config: {
            name: "shape",
            modifiers: {
              color: ["color", "red"],
              edgeSmoothness: ["edge smoothness", "auto"], //manual//none
            },
          },
        },
        {
          config: {
            name: "shadow",
            modifiers: {
              strength: ["strength", "50"], //0 to 100
              editMode: ["edit mode", "simple"], //advanced
              blur: ["blur", "50"],
            },
          },
        },
        {
          config: {
            name: "blend",
            modifiers: {
              strength: ["strength", "50"],
            },
          },
        },
      ],
      activeTool: null,
    };
  }
  setActiveTool(tool) {
    this.setState({ activeTool: tool });
  }
  render() {
    return (
      <div className="App">
        <div className="canvasContainer">
          <canvas id="project" resize="true"></canvas>
        </div>
        <Toolbar
          tools={this.state.tools}
          setActiveTool={this.setActiveTool.bind(this)}
          activeTool={this.state.activeTool}
        />
      </div>
    );
  }
}
export default App;

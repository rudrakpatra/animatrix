import "./App.css";
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";
import React from "react";
import HumanInput from "humaninput/dist/humaninput-1.1.15-full";
class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("initialize paper and tools");
    this.HI = new HumanInput(window);
    this.HI.off();
    this.HI.on("ctrl->s", this.saveProject);
    this.HI.on("w->a->d->s", this.newProject);
    this.HI.on("escape", this.closeProject);
    window.addEventListener("keydown", (e) => {
      e.preventDefault();
    });
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
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
  //ctrls  to save
  //ctrl c ctrl v canvas,
  //on savin we need the tool modifiers status
  saveProject = () => {
    console.log("saved file: uttto file???");
    return true;
  };
  newProject = () => {
    console.log("newProject: uttto file???");
    return true;
  };
  closeProject = () => {
    console.log("closeProject: uttto file???");
    return true;
  };

  setActiveTool(tool) {
    this.setState({ activeTool: tool });
  }
  render() {
    return (
      <div className="App">
        <Canvas activeTool={this.state.activeTool} HI={this.HI} />
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

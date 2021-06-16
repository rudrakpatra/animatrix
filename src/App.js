import "./App.css";
import Toolbar from "./components/Toolbar";
import React from "react";
import HumanInput from "humaninput/dist/humaninput-1.1.15-full";

import paper from "paper";
import Pencil from "./tools/Pencil";
import Pan from "./tools/Pan";
class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("initialize paper and tools");
    window.addEventListener("keydown", (e) => {
      e.preventDefault();
    });
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    this.state = {
      // tools=[new Pencil(),new Polygon(),new Eraser(),new Shadow()]
      toolModifiers: [
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
      tools: [new Pan(this.scope, this.HI), new Pencil(this.scope, this.HI)],
      lastTool: null,
      activeTool: null,
      activeToolInfo: null,
    };
    this.HI = new HumanInput(window);
    this.HI.off();
    this.HI.on("ctrl->s", this.saveProject);
    this.HI.on("n->p", this.newProject);
    this.HI.on("escape", this.closeProject);
    window.onload = () => {
      this.scope = paper.setup("project");
    };
    //set lastTool,activeTool on shortcut(specified in the tools file )
    this.state.tools.forEach((tool) => {
      if (tool.shortcut.type === "tapping") {
        this.HI.on("keyup:" + tool.shortcut.sequence, () => {
          if (!this.state.activeTool || this.state.activeTool.canSwitchTool) {
            this.state.lastTool?.paperTool.activate();
            this.setState({
              activeTool: this.state.lastTool,
              lastTool: tool,
            });
          }
        });
        this.HI.on("keydown:" + tool.shortcut.sequence, () => {
          if (!this.state.activeTool || this.state.activeTool.canSwitchTool) {
            tool.paperTool.activate();
            this.setState({
              lastTool: this.state.activeTool,
              activeTool: tool,
            });
            this.state.activeTool.paperTool.activate();
          }
        });
      } else if (tool.shortcut.type === "switch") {
        this.HI.on(tool.shortcut.sequence, () => {
          if (!this.state.activeTool || this.state.activeTool.canSwitchTool) {
            this.setState({
              lastTool: this.state.activeTool,
              activeTool: tool,
            });
            this.state.activeTool.paperTool.activate();
          }
        });
      }
    });
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
    if (!this.state.activeTool || this.state.activeTool.canSwitchTool) {
      this.setState({
        lastTool: this.state.activeTool,
        activeTool: tool,
      });
      this.state.activeTool.tool.activate();
    }
  }
  setActiveToolInfo(toolInfo) {
    this.setState({ activeToolInfo: toolInfo });
  }
  render() {
    return (
      <div className="App">
        <div className="canvasContainer">
          <canvas
            className={`${
              this.state.activeTool === this.state.tools.pan && "pan"
            }`}
            id="project"
            resize="true"
          ></canvas>
        </div>
        <Toolbar
          toolModifiers={this.state.toolModifiers}
          setActiveToolInfo={this.setActiveToolInfo.bind(this)}
          activeToolInfo={this.state.activeToolInfo}
        />
      </div>
    );
  }
}
export default App;

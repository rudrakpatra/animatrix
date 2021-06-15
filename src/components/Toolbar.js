import React from "react";
import "./Toolbar.css";
class Toolbar extends React.Component {
  //   constructor(props) {
  //     super(props);
  //   }
  renderModifiers() {
    return (
      <div className="modifiersList">
        <div className="container">
          {this.props.activeTool
            ? Object.entries(this.props.activeTool.config.modifiers).map(
                ([, [type, data]], i) => {
                  return (
                    <div
                      key={i}
                      className="modifier color"
                      onClick={(event) => {
                        console.log(`${type} : ${data} clicked`);
                      }}
                    >
                      {`${type} : ${data}`}
                    </div>
                  );
                }
              )
            : true}
        </div>
      </div>
    );
  }
  renderTools() {
    return (
      <div className="toolsList">
        {this.props.tools.map((tool, i) => {
          return (
            <div
              key={i}
              className={`tool ${this.props.activeTool === tool && "active"}`}
              onClick={() => this.props.setActiveTool(tool)}
            >
              {tool.config.name}
            </div>
          );
        })}
      </div>
    );
  }
  render() {
    return (
      <div className="toolsBar overlay">
        <div className="content">
          {this.renderModifiers()}
          {this.renderTools()}
        </div>
      </div>
    );
  }
}
export default Toolbar;

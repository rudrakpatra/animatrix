import React from "react";
import "./Canvas.css";
import paper from "paper";
import Pencil from "../tools/Pencil";
class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.HI = this.props.HI;
    this.HI.off("pan");
    this.HI?.on("pan", function (e, panObj) {
      //   {
      //     x: 153;
      //     xMoved: -3;
      //     xOrig: 226;
      //     xPrev: 156;
      //     y: 272;
      //     yMoved: 2;
      //     yOrig: 354;
      //     yPrev: 270;
      //   }
      return false;
    });

    window.onload = () => {
      this.scope = paper.setup("project");
      console.log(paper);
    };
    this.pencil = new Pencil(this.scope, this.HI);
    this.pencil.tool.activate();
  }
  render() {
    return (
      <div className="canvasContainer">
        <canvas id="project" resize="true"></canvas>
      </div>
    );
  }
}
export default Canvas;

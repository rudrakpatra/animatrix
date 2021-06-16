import paper from "paper";
class Pan {
  constructor(scope, HI) {
    this.shortcut = { sequence: "t", type: "tapping" }; //releasing key makes the previous tool active
    this.canSwitchTool = true;
    this.paperTool = new paper.Tool();
    this.paperTool.onMouseDrag = (event) => {
      paper.project.layers.forEach((layer) => {
        layer.translate(event.delta);
      });
    };
  }
}
export default Pan;

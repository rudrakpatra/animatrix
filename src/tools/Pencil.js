import paper from "paper";
class Pencil {
  constructor(scope, HI) {
    this.shortcut = { sequence: "p", type: "switch" };
    this.canSwitchTool = true; //make this false when you want to prevent switching to another tool: eg in middle of drawing a stroke
    this.lastStroke = null;
    this.strokeWidth = 1;
    this.fillColor = {
      hue: 0,
      saturation: 0,
      brightness: 0.2 * Math.random(),
    };
    this.paperTool = new paper.Tool();
    this.paperTool.minDistance = 5;
    this.paperTool.maxDistance = 20;

    this.paperTool.onMouseDown = (event) => {
      this.lastStroke = new paper.Path();
      this.lastStroke.fillColor = this.fillColor;
      this.lastStroke.add(event.point);
      this.canSwitchTool = false;
    };

    this.paperTool.onMouseDrag = (event) => {
      var step = new paper.Point(event.delta.x / 10, event.delta.y / 10);
      //width varies from
      //0.5 to 2
      this.strokeWidth = 0.2 * step.length + 0.8 * this.strokeWidth;
      step.length = this.strokeWidth;
      step.angle = event.delta.angle + 90;
      var top = new paper.Point(
        event.middlePoint.x + step.x,
        event.middlePoint.y + step.y
      );
      var bottom = new paper.Point(
        event.middlePoint.x - step.x,
        event.middlePoint.y - step.y
      );
      this.lastStroke.add(top);
      this.lastStroke.insert(0, bottom);
      this.lastStroke.smooth();
    };

    this.paperTool.onMouseUp = (event) => {
      this.lastStroke.add(event.point);
      this.lastStroke.closed = true;
      this.lastStroke.smooth();
      this.canSwitchTool = true;
    };
  }
}
export default Pencil;

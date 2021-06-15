import paper from "paper";
class Pencil {
  constructor(scope, HI) {
    this.lastStroke = null;
    this.strokeWidth = 1;
    this.fillColor = {
      hue: 0,
      saturation: 0,
      brightness: 0.2 * Math.random(),
    };
    this.tool = new paper.Tool();
    this.tool.minDistance = 2;
    this.tool.maxDistance = 40;
    this.tool.onMouseDown = (event) => {
      this.lastStroke = new paper.Path();
      this.lastStroke.fillColor = this.fillColor;
      this.lastStroke.add(event.point);
    };
    this.tool.onMouseDrag = (event) => {
      var step = new paper.Point(event.delta.x / 20, event.delta.y / 20);
      //1 to 4
      this.strokeWidth = 0.4 * step.length + 0.6 * this.strokeWidth;
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

    this.tool.onMouseUp = (event) => {
      this.lastStroke.add(event.point);
      this.lastStroke.closed = true;
      this.lastStroke.smooth();
    };
  }
}
export default Pencil;

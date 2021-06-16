import paper from "paper";
var drawGridLines = function (number_width, boundingRect) {
  var size = boundingRect.width / number_width;

  var num_rectangles_wide = Math.ceil(boundingRect.width / size);
  var num_rectangles_tall = Math.ceil(boundingRect.height / size);
  for (var i = 0; i <= num_rectangles_wide; i++) {
    var xPos = boundingRect.left + i * size;
    var topPoint = new paper.Point(xPos, boundingRect.top);
    var bottomPoint = new paper.Point(xPos, num_rectangles_tall * size);
    var verLine = new paper.Path.Line(topPoint, bottomPoint);
    verLine.strokeColor = new paper.Color(0, 0, 0, 0.5);
  }
  for (var j = 0; j <= num_rectangles_tall; j++) {
    var yPos = boundingRect.top + j * size;
    var leftPoint = new paper.Point(boundingRect.left, yPos);
    var rightPoint = new paper.Point(boundingRect.right, yPos);
    var horLine = new paper.Path.Line(leftPoint, rightPoint);
    horLine.strokeColor = new paper.Color(0, 0, 0, 0.5);
  }
};

export default drawGridLines;

const gm = require('gm');

const fontSize = 25;
const font = './fonts/roboto/Roboto-Light.ttf';
const strokeWidth = 5;
const color = '#c53c3d';

exports.drawRect = (inFile, outFile, name, x, y, x1, y1) => {
  gm(inFile)
  .stroke(color)
  .strokeWidth(strokeWidth)
  .fill('none')
  .drawRectangle(x, y, x1, y1)
  .strokeWidth(1)
  .font(font, fontSize)
  .drawText(x, y1 + fontSize + 10, name)
  .write(outFile, function(err) {
    if(err) {
      console.log('error happened: ', err);
    }
  });
}

exports.drawRects = (inFile, outFile, rectangles) => {
  let graphic = gm(inFile)
  .stroke(color);

  rectangles.forEach((rectangle, i) => {
    const rect = rectangle.rect;
    graphic
    .strokeWidth(strokeWidth)
    .fill('none')
    .drawRectangle(rect.x, rect.y, rect.x1, rect.y1)
    .strokeWidth(1)
    .font(font, fontSize)
    .drawText(rect.x, rect.y1 + fontSize + 10, rectangles[i].name);
  });

  graphic
  .write(outFile, function(err) {
    if(err) {
      console.log('error happened: ', err);
    }
  });
}

import { G, Path } from "@svgdotjs/svg.js";

const strokeWidth = 1;
const strokeColor = "#aaa";

export function drawFrontGlueParts(w: number, h: number, d: number): G {
  const group = new G();
  const glueLeft = new Path();
  const glueRight = new Path();

  glueLeft.plot();
  glueLeft.fill("rgba(0,0,0,0)");
  glueLeft.stroke({
    color: strokeColor,
    width: strokeWidth,
  });

  glueRight.plot();
  glueLeft.fill("rgba(0,0,0,0)");
  glueLeft.stroke({
    color: strokeColor,
    width: strokeWidth,
  });

  group.add(glueLeft);
  group.add(glueRight);

  return group;
}

export function drawBackGlueParts(w: number, h: number, d: number): G {
  const group = new G();
  const glueSide = new Path();
  const glueBottom = new Path();

  glueSide.plot(
    `M ${w} 0
     l ${d} ${d / 6}
     v ${h - d / 3}
     l -${d} ${d / 6}`
  );
  glueSide.fill("rgba(0,0,0,0)");
  glueSide.stroke({
    color: strokeColor,
    width: strokeWidth,
  });

  glueBottom.plot(
    `M 0 ${h}
     l ${d / 6} ${d}
     h ${w - d / 3}
     l ${d / 6} -${d}`
  );
  glueBottom.fill("rgba(0,0,0,0)");
  glueBottom.stroke({
    color: strokeColor,
    width: strokeWidth,
  });

  group.add(glueSide);
  group.add(glueBottom);

  return group;
}

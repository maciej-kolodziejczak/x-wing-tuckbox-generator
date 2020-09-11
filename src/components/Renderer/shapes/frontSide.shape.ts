import { Path } from "@svgdotjs/svg.js";

const strokeWidth = 1;
const strokeColor = "#aaa";

export function drawFrontSide(w: number, h: number): Path {
  const shape = new Path();

  shape.plot(
    `M 0 0
     h ${w}
     v ${h}
     h -${w}`
  );
  shape.fill("rgba(0,0,0,0)");
  shape.stroke({
    color: strokeColor,
    width: strokeWidth,
    dasharray: "4",
  });

  return shape;
}

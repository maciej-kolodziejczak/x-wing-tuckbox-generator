import { Path } from "@svgdotjs/svg.js";

const strokeWidth = 1;
const strokeColor = "#aaa";

export function drawBackSide(w: number, h: number): Path {
  const fold = new Path();

  fold.plot(
    `M 0 0
     h ${w}
     v ${h}
     h -${w}`
  );
  fold.fill("rgba(0,0,0,0)");
  fold.stroke({
    color: strokeColor,
    width: strokeWidth,
    dasharray: "4",
  });

  return fold;
}

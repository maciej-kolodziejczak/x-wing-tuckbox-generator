import { G, Path } from "@svgdotjs/svg.js";

const strokeWidth = 1;
const strokeColor = "#aaa";

export function drawLeftSide(w: number, h: number): G {
  const group = new G();
  const cut = new Path();
  const fold = new Path();

  cut.plot(
    `M 0 ${h}
     v 0 -${h}`
  );
  cut.fill("rgba(0,0,0,0)");
  cut.stroke({
    width: strokeWidth,
    color: strokeColor,
  });

  fold.plot(
    `M 0 0
     h ${w}
     v ${h}
     h -${w}`
  );
  fold.fill("rgba(0,0,0,0)");
  fold.stroke({
    width: strokeWidth,
    color: strokeColor,
    dasharray: "4",
  });

  group.add(cut);
  group.add(fold);

  return group;
}

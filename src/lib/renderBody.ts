import { Path, G } from "@svgdotjs/svg.js";

function renderCutShape(w: number, h: number, l: number): Path {
  const shape = new Path();

  shape
    .plot(
      `M 0 ${l * 1.5}
     a ${l / 1.5} ${l / 1.5} 0 0 1 ${l / 1.5} -${l / 1.5}
     h ${l / 3}
     v 0 ${l / 1.5}
     v -${l}
     a ${l / 2} ${l / 2} 0 0 1 ${l / 2} -${l / 2}
     h ${w - l}
     a ${l / 2} ${l / 2} 0 0 1 ${l / 2} ${l / 2}
     v ${l}
     m 0 -${l / 1.5}
     h ${l / 3}
     a ${l / 1.5} ${l / 1.5} 0 0 1 ${l / 1.5} ${l / 1.5}
     h ${w}
     l ${l * 0.9} ${l / 6}
     v ${h - l / 3}
     l ${-l * 0.9} ${l / 6}
     l -${l / 6} ${l * 0.9}
     h -${w - l / 3}
     l -${l / 6} -${l * 0.9}
     l -${l / 6} ${l * 0.9}
     h -${l - l / 3}
     l -${l / 6} -${l * 0.9}
     v ${l}
     h -${w}
     v -${l}
     l -${l / 6} ${l * 0.9}
     h -${l - l / 3}
     l -${l / 6} -${l * 0.9}
     v -${h}`
    )
    .fill("#fff")
    .stroke({
      width: 1,
      color: "#aaa",
    });

  return shape;
}

function renderFoldShape(w: number, h: number, l: number): Path {
  const shape = new Path();

  shape
    .plot(
      `M 0 ${l * 1.5}
     h ${l}
     v ${h}
     h -${l}
     m ${l} 0
     h ${w}
     v ${-h}
     m 0 ${h}
     h ${l}
     v -${h}
     m 0 ${h}
     h ${w}
     v -${h}
     m -${w} 0
     h -${l}
     h -${w}
     m 0 -${l}
     h ${w}
    `
    )
    .fill("rgba(0,0,0,0)")
    .stroke({
      width: 1,
      color: "#aaa",
      dasharray: "4",
    });

  return shape;
}

export function renderBody(width: number, height: number, length: number): G {
  const group = new G();

  group.add(renderCutShape(width, height, length));
  group.add(renderFoldShape(width, height, length));

  return group;
}

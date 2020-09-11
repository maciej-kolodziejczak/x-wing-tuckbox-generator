import { Svg, SVG, Rect, extend, Container } from "@svgdotjs/svg.js";
import { scale } from "./helpers";

function mmToPx(v: number): number {
  return v * 3.779527559;
}

function scaleToPx(v: number, s: number): number {
  return mmToPx(v) * s;
}

const stroke = "red";
const strokeWidth = (s: number) => scale(0.5, s);
const shapeAttrs = (s: number) => ({
  fill: "none",
  stroke,
  "stroke-width": strokeWidth(s),
});

export function renderGlueParts(
  svg: Svg,
  w: number,
  h: number,
  d: number,
  s: number
) {
  const draw = svg.group();
}

export function frontFaceRenderer(
  svg: Svg,
  w: number,
  h: number,
  d: number,
  s: number
) {
  const mX = d;
  const mY = d + d / 2;
  const draw = svg.group().translate(mX, mY);
  // render shape
  const shape = draw.rect(w, h).attr(shapeAttrs(s));

  const image = draw.group().translate(0, scale(21.6, s));

  image
    .image(
      "https://sb-cdn.fantasyflightgames.com/card_art/Card_art_XW_P_13.jpg"
    )
    .width(w)
    .height(scale(47, s))
    .attr({
      preserveAspectRatio: "xMidYMid slice",
    });

  // render top background part
  const topBG = draw.group();

  // topBG.rect(w, scale(25.65, s)).attr({ fill: "white" });
  topBG
    .path(
      `M 0 0
       h ${w}
       v ${scale(24.22, s)}
       h -${scale(4.275, s)}
       l -${scale(2, s)} -${scale(2, s)}
       h -${w - scale(4.275, s) * 2 - scale(4, s)}
       l -${scale(2, s)} ${scale(2, s)}
       h -${scale(4.275, s)}
       Z`
    )
    .attr({ fill: "#000" });

  const gradient1 = topBG.gradient("linear", (add) => {
    add.stop(0, "#000");
    add.stop(0.7, "#000");
    add.stop(1, "rgba(0,0,0,0)");
  });

  const gradient2 = topBG.gradient("linear", (add) => {
    add.stop(0, "rgba(0,0,0,0)");
    add.stop(0.3, "#000");
    add.stop(1, "#000");
  });

  topBG
    .path(
      `M 0 ${scale(25.65, s)}
       h ${scale(4.84, s)}
       l ${scale(2, s)} -${scale(2, s)}`
    )
    .attr({ fill: "none", stroke: gradient1, "stroke-width": scale(0.25, s) });

  topBG
    .path(
      `M ${w} ${scale(25.65, s)}
       h -${scale(4.84, s)}
       l -${scale(2, s)} -${scale(2, s)}`
    )
    .attr({ fill: "none", stroke: gradient2, "stroke-width": scale(0.25, s) });
  // render logo

  topBG
    .path(
      `m ${scale(10.83, s)} 0
       v ${scale(3.75, s)}
       l -${scale(2.28, s)} ${scale(1.99, s)}
       v ${scale(14.25, s)}`
    )
    .attr({
      fill: "none",
      stroke: topBG
        .gradient("linear", (add) => {
          add.stop(0, "rgba(0,0,0,0)");
          add.stop(0.2, "#fff");
          add.stop(0.6, "#fff");
          add.stop(1, "rgba(0,0,0,0)");
        })
        .from(0, 0)
        .to(0, 1),
      "stroke-width": scale(0.15, s),
    });

  topBG
    .path(
      `m ${w - scale(10.83, s)} 0
       v ${scale(3.75, s)}
       l ${scale(2.28, s)} ${scale(1.99, s)}
       v ${scale(14.25, s)}`
    )
    .attr({
      fill: "none",
      stroke: topBG
        .gradient("linear", (add) => {
          add.stop(0, "rgba(0,0,0,0)");
          add.stop(0.2, "#fff");
          add.stop(0.6, "#fff");
          add.stop(1, "rgba(0,0,0,0)");
        })
        .from(0, 0)
        .to(0, 1),
      "stroke-width": scale(0.15, s),
    });

  const logo = draw.group();

  logo
    .image(
      "https://images-cdn.fantasyflightgames.com/filer_public/ed/0f/ed0f4b13-df36-44e7-b362-3c43ed8dba42/swz_logo_bk-tm.png"
    )
    .width(scale(39.5, s))
    .height(scale(15.7, s))
    .cx(w / 2)
    .cy((scale(24.22, s) - scale(2, s)) / 2);
  // render artwork

  // render bottom background part
  const bottomBG = draw.group().translate(0, h);

  // topBG.rect(w, scale(25.65, s)).attr({ fill: "white" });
  bottomBG
    .path(
      `m 0 0
       h ${w}
       v -${scale(24.22, s)}
       h -${scale(4.275, s)}
       l -${scale(2, s)} ${scale(2, s)}
       h -${w - scale(4.275, s) * 2 - scale(4, s)}
       l -${scale(2, s)} -${scale(2, s)}
       h -${scale(4.275, s)}
       Z`
    )
    .attr({ fill: "#000" });

  bottomBG
    .path(
      `m ${scale(4.84, s)} -${scale(25.65, s)}
     l ${scale(2, s)} ${scale(2, s)}
     h ${scale(17.1, s)}
     `
    )
    .attr({
      fill: "none",
      stroke: bottomBG.gradient("linear", (add) => {
        add.stop(0, "rgba(0,0,0,0)");
        add.stop(0.15, "#000");
        add.stop(0.65, "#000");
        add.stop(1, "rgba(0,0,0,0)");
      }),
      "stroke-width": scale(0.25, s),
    });

  bottomBG
    .path(
      `m ${w - scale(4.84, s)} -${scale(25.65, s)}
     l -${scale(2, s)} ${scale(2, s)}
     h -${scale(17.1, s)}
     `
    )
    .attr({
      fill: "none",
      stroke: bottomBG.gradient("linear", (add) => {
        add.stop(0, "rgba(0,0,0,0)");
        add.stop(0.15, "#000");
        add.stop(0.65, "#000");
        add.stop(1, "rgba(0,0,0,0)");
      }),
      "stroke-width": scale(0.25, s),
    });

  bottomBG
    .path(
      `m ${scale(8.83, s)} -${scale(21.22, s)}
     v ${scale(14.25, s)}
     l ${scale(2.28, s)} ${scale(1.99, s)}
     v ${scale(3.75, s)}`
    )
    .attr({
      fill: "none",
      stroke: topBG
        .gradient("linear", (add) => {
          add.stop(0, "rgba(0,0,0,0)");
          add.stop(0.2, "#fff");
          add.stop(0.6, "#fff");
          add.stop(1, "rgba(0,0,0,0)");
        })
        .from(0, 0)
        .to(0, 1),
      "stroke-width": scale(0.15, s),
    });

  bottomBG
    .path(
      `m ${w - scale(8.83, s)} -${scale(21.22, s)}
     v ${scale(14.25, s)}
     l -${scale(2.28, s)} ${scale(1.99, s)}
     v ${scale(3.75, s)}`
    )
    .attr({
      fill: "none",
      stroke: topBG
        .gradient("linear", (add) => {
          add.stop(0, "rgba(0,0,0,0)");
          add.stop(0.2, "#fff");
          add.stop(0.6, "#fff");
          add.stop(1, "rgba(0,0,0,0)");
        })
        .from(0, 0)
        .to(0, 1),
      "stroke-width": scale(0.15, s),
    });

  bottomBG
    .text("Pilot Cards")
    .x(w / 2)
    .y(-scale(21, 1))
    .attr({
      fill: "#fff",
      "font-family": "Kimberley",
      "text-anchor": "middle",
      "dominant-baseline": "middle",
    });

  bottomBG
    .text("Y-Wing BTL-4A")
    .x(w / 2)
    .y(-scale(15, 1))
    .attr({
      fill: "#fff",
      "font-size": scale(3, 1),
      "font-family": "Kimberley",
      "text-anchor": "middle",
      "dominant-baseline": "middle",
    });
  // render box info
  // render title
  // render subtitle
  // render logo

  //0.285
}
export function backFaceRenderer(
  svg: Svg,
  w: number,
  h: number,
  d: number,
  s: number
) {
  const mX = d + w + d;
  const mY = d + d / 2;
  const draw = svg.group().translate(mX, mY);
  // render shape
  const shape = draw.rect(w, h).attr(shapeAttrs(s));

  // tba
}

export function sidesRenderer(
  svg: Svg,
  w: number,
  h: number,
  d: number,
  s: number
) {
  const mX1 = 0;
  const mX2 = d + w;
  const mY1 = d + d / 2;
  const mY2 = d + d / 2;

  const shapeL = svg.group().translate(mX1, mY1);
  const shapeR = svg.group().translate(mX2, mY2);

  shapeL.rect(d, h).attr(shapeAttrs(s));

  shapeR.rect(d, h).attr(shapeAttrs(s));

  // render background
  // render logo
  // render title
  // render subtitle
}

export function tucksRenderer(
  svg: Svg,
  w: number,
  h: number,
  d: number,
  s: number
) {
  const mX1 = d;
  const mX2 = d;
  const mY1 = d / 2;
  const mY2 = d / 2 + d + h;

  const shapeC = svg.group().translate(mX1, 0);
  const shapeT = svg.group().translate(mX1, mY1);
  const shapeB = svg.group().translate(mX2, mY2);
  const shapeF1 = svg.group().translate(0, d / 2 + d / 3);
  const shapeF2 = svg.group().translate(d + w, d / 2 + d / 3);

  shapeF1
    .path(
      `M 0 ${(2 / 3) * d}
       a ${(2 / 3) * d}, ${(2 / 3) * d} 0 0 1 ${(2 / 3) * d}, -${(2 / 3) * d}
       h ${d / 3}`
    )
    .attr(shapeAttrs(s));
  shapeF2
    .path(
      `M 0 0
       h ${d / 3}
       a ${(2 / 3) * d} ${(2 / 3) * d} 0 0 1 ${(2 / 3) * d}, ${(2 / 3) * d}`
    )
    .attr(shapeAttrs(s));
  shapeC
    .path(
      `M 0 ${d / 2}
       a ${d / 2} ${d / 2} 0 0 1 ${d / 2} -${d / 2}
       h ${w - d}
       a ${d / 2} ${d / 2} 0 0 1 ${d / 2} ${d / 2}`
    )
    .attr(shapeAttrs(s));

  shapeT.rect(w, d).attr(shapeAttrs(s));
  shapeB.rect(w, d).attr(shapeAttrs(s));

  // render background
  // render logo
  // render title
  // render subtitle
}

export function gluePartsRenderer(
  svg: Svg,
  w: number,
  h: number,
  d: number,
  s: number
) {
  const mXFL = 0;
  const mYFL = d / 2 + d + h;
  const mXFR = d + w;
  const mYFR = mYFL;
  const mXSB = d + w + d;
  const mYSB = mYFL;
  const mXSR = d + w + d + w;
  const mYSR = d / 2 + d;

  const glueFL = svg.group().translate(mXFL, mYFL);
  const glueFR = svg.group().translate(mXFR, mYFR);
  const glueSB = svg.group().translate(mXSB, mYSB);
  const glueSR = svg.group().translate(mXSR, mYSR);

  glueFL
    .path(
      `M 0 0
       l ${d / 6} ${d / 2}
       h ${d / 1.5}
       l ${d / 6} -${d / 2}`
    )
    .attr(shapeAttrs(s));
  glueFR
    .path(
      `M 0 0
       l ${d / 6} ${d / 2}
       h ${d / 1.5}
       l ${d / 6} -${d / 2}`
    )
    .attr(shapeAttrs(s));

  glueSB
    .path(
      `M 0 0
        l ${d / 6} ${d}
        h ${w - d / 3}
        l ${d / 6} -${d}`
    )
    .attr(shapeAttrs(s));

  glueSR
    .path(
      `M 0 0
        l ${d} ${d / 6}
        v ${h - d / 3}
        l -${d} ${d / 6}`
    )
    .attr(shapeAttrs(s));
}

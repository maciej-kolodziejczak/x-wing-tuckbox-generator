import { Rect, Path, G, Image, Gradient, Text } from "@svgdotjs/svg.js";

/**
 * Generic elements
 */
export function drawFadeLineH(
  h: number,
  d: "top" | "bottom",
  o: "left" | "right"
): G {
  const group = new G();
  const line = new Path();
  const gradient = new Gradient("linear");

  gradient.stop(0, "rgba(0,0,0,0)");
  gradient.stop(0.2, "#fff");
  gradient.stop(0.6, "#fff");
  gradient.stop(1, "rgba(0,0,0,0)");
  gradient.from(0, 0);
  gradient.to(0, 1);

  let s1d;
  let s2d;
  let s3d;

  const ssl = h / 8;
  const sll = (5 / 8) * h;

  switch (true) {
    case o === `left`:
      s2d = `l -${ssl} ${ssl}`;
      break;
    case o === "right":
      s2d = `l ${ssl} ${ssl}`;
      break;
  }

  switch (true) {
    case d === `top`:
      s1d = `v ${ssl * 2}`;
      s3d = `v ${sll}`;
      break;
    case d === "bottom":
      s1d = `v ${sll}`;
      s3d = `v ${ssl * 2}`;
      break;
  }

  line.plot(
    `M 0 0
     ${s1d}
     ${s2d}
     ${s3d}`
  );
  line.stroke({
    width: 0.5,
  });
  line.attr({
    stroke: gradient,
  });

  group.add(gradient);
  group.add(line);

  return group;
}

export function drawLogoImage(w: number, h: number): Image {
  const logo = new Image();

  const imageH = h;
  const imageW = h * 2.54;

  logo.load(
    "https://images-cdn.fantasyflightgames.com/filer_public/ed/0f/ed0f4b13-df36-44e7-b362-3c43ed8dba42/swz_logo_bk-tm.png"
  );
  logo.width(imageW);
  logo.height(imageH);

  return logo;
}

/**
 * Left side
 */
export function drawLeftClap(
  w: number,
  h: number,
  d: number,
  sw: number
): Path {
  const clap = new Path();

  clap.plot(
    `m 0 0
       a ${d / 1.5} ${d / 1.5} 0 0 1 ${d / 1.5} -${d / 1.5}
       h ${d / 3}
       v ${d / 1.5}
       Z`
  );
  clap.fill("#000");
  clap.stroke({
    width: sw,
    color: "red",
  });

  return clap;
}

export function drawLeftRect(
  w: number,
  h: number,
  d: number,
  sw: number
): Rect {
  const shape = new Rect();

  shape.size(d, h);
  shape.fill("#000");
  shape.stroke({
    width: sw,
    color: "red",
  });

  return shape;
}

export function drawLeftGlue(
  w: number,
  h: number,
  d: number,
  sw: number
): Path {
  const glue = new Path();

  glue.plot(
    `M 0 0
         l ${d / 6} ${d / 2}
         h ${d / 1.5}
         l ${d / 6} -${d / 2}
         Z`
  );
  glue.fill("#000");
  glue.stroke({
    width: sw,
    color: "red",
  });

  return glue;
}

export function drawLeftSide(
  w: number,
  h: number,
  d: number,
  sw: number = 2
): G {
  const group = new G();

  group.add(drawLeftClap(w, h, d, sw).translate(0, d * 1.5));
  group.add(drawLeftRect(w, h, d, sw).translate(0, d * 1.5));
  group.add(drawLeftGlue(w, h, d, sw).translate(0, h + d * 1.5));

  return group;
}

/**
 * Face shape contents
 */
export function drawFaceShapeTop(w: number, h: number): G {
  const group = new G();

  const shape = new Path();

  shape.plot(
    `M 0 0
    h ${w}
    v ${h}
    h -${w * 0.068}
    l -${w * 0.032} -${w * 0.032}
    h -${w - 2 * (w * 0.068) - 2 * (w * 0.032)}
    l -${w * 0.032} ${w * 0.032}
    h -${w * 0.068}
    Z`
  );
  shape.fill("#000");
  shape.stroke("none");

  group.add(shape);
  group.add(drawFadeLineH(h * 0.9, "top", "left").translate(w * 0.15, 0));
  group.add(drawFadeLineH(h * 0.9, "top", "right").translate(w * 0.85, 0));
  group.add(drawLogoImage(w, h * 0.56).center(w / 2, h / 2));

  return group;
}

export function drawFaceShapeArtwork(w: number, h: number): Image {
  const artwork = new Image();

  artwork.load(
    "https://sb-cdn.fantasyflightgames.com/card_art/Card_art_XW_P_37.jpg"
  );
  artwork.width(w);
  artwork.height(h);
  artwork.attr({
    preserveAspectRatio: "xMidYMid slice",
  });

  return artwork;
}

export function drawFaceShapeBottomText(w: number, h: number): G {
  const group = new G();
  const title = new Text();
  const tagline = new Text();

  title.y(0);
  title.text("Pilot Cards");
  title.fill("#fff");
  title.font({
    family: "Kimberley",
    size: h * 0.14,
  });
  title.attr({
    "text-anchor": "middle",
    "dominant-baseline": "middle",
  });

  tagline.y(h * 0.17);
  tagline.text("Space Shuttle SSX");
  tagline.fill("#ccc");
  tagline.font({
    family: "Kimberley",
    size: h * 0.09,
  });
  tagline.attr({
    "text-anchor": "middle",
    "dominant-baseline": "middle",
  });

  group.add(title);
  group.add(tagline);

  return group;
}

export function drawFaceShapeBottom(w: number, h: number): G {
  const group = new G();
  const shape = new Path();

  shape.plot(
    `M 0 0
     h ${w * 0.068}
     l ${w * 0.032} ${w * 0.032}
     h ${w - 2 * (w * 0.068) - 2 * (w * 0.032)}
     l ${w * 0.032} -${w * 0.032}
     h ${w * 0.068}
     v ${h}
     h -${w}
     Z`
  );
  shape.fill("#000");
  shape.stroke("none");

  group.add(shape);
  group.add(
    drawFadeLineH(h * 0.9, "bottom", "right").translate(
      w * 0.15 - h / 8,
      h * 0.1
    )
  );
  group.add(
    drawFadeLineH(h * 0.9, "bottom", "left").translate(
      w * 0.85 + h / 8,
      h * 0.1
    )
  );
  group.add(
    drawFaceShapeBottomText(w, h)
      .cx(w / 2)
      .translate(0, h * 0.3)
  );

  return group;
}

/**
 * Face side
 */
export function drawTuckTop(w: number, h: number, d: number, sw: number): G {
  const group = new G();
  const close = new Path();
  const tuck = new Rect();

  close.plot(
    `M 0 ${d / 2}
     a ${d / 2} ${d / 2} 0 0 1 ${d / 2} -${d / 2}
     h ${w - d}
     a ${d / 2} ${d / 2} 0 0 1 ${d / 2} ${d / 2}
     Z`
  );
  close.fill("#000");
  close.stroke({
    width: sw,
    color: "red",
  });

  tuck.size(w, d);
  tuck.y(d / 2);
  tuck.fill("#000");
  tuck.stroke({
    width: sw,
    color: "red",
  });

  group.add(tuck);
  group.add(close);

  return group;
}

export function drawTuckBottom(
  w: number,
  h: number,
  d: number,
  sw: number
): Rect {
  const tuck = new Rect();

  tuck.size(w, d);
  tuck.fill("#000");
  tuck.stroke({
    width: sw,
    color: "red",
  });

  return tuck;
}

export function drawFaceShape(w: number, h: number, d: number, sw: number): G {
  const group = new G();
  const shape = new Rect();

  group.add(drawFaceShapeArtwork(w, h * 0.5).translate(0, h * 0.28));
  group.add(drawFaceShapeTop(w, h * 0.3));
  group.add(drawFaceShapeBottom(w, h * 0.3).translate(0, h * 0.7));

  shape.size(w, h);
  shape.fill("rgba(0,0,0,0)");
  shape.stroke({
    width: sw,
    color: "red",
  });

  group.add(shape);

  return group;
}

export function drawFaceSide(
  w: number,
  h: number,
  d: number,
  sw: number = 2
): G {
  const group = new G();

  group.translate(d, 0);

  group.add(drawTuckTop(w, h, d, sw));
  group.add(drawFaceShape(w, h, d, sw).translate(0, d * 1.5));
  group.add(drawTuckBottom(w, h, d, sw).translate(0, d * 1.5 + h));

  return group;
}

/**
 * Right side
 */
export function drawRightClap(
  w: number,
  h: number,
  d: number,
  sw: number
): Path {
  const clap = new Path();

  clap.plot(
    `M 0 0
     h ${d / 3}
     a ${d / 1.5} ${d / 1.5} 0 0 1 ${d / 1.5} ${d / 1.5}
     h -${d}
     Z
     `
  );
  clap.fill("#000");
  clap.stroke({
    width: sw,
    color: "red",
  });

  return clap;
}

export function drawRightRect(
  w: number,
  h: number,
  d: number,
  sw: number
): Rect {
  const rect = new Rect();

  rect.size(d, h);
  rect.fill("#000");
  rect.stroke({
    width: sw,
    color: "red",
  });

  return rect;
}

export function drawRightGlue(
  w: number,
  h: number,
  d: number,
  sw: number
): Path {
  const glue = new Path();

  glue.plot(
    `M 0 0
       l ${d / 6} ${d / 2}
       h ${d / 1.5}
       l ${d / 6} -${d / 2}
       Z`
  );
  glue.fill("#000");
  glue.stroke({
    width: sw,
    color: "red",
  });

  return glue;
}

export function drawRightSide(
  w: number,
  h: number,
  d: number,
  sw: number = 2
): G {
  const group = new G();

  group.add(drawRightClap(w, h, d, sw).translate(d + w, d / 2 + d / 3));
  group.add(drawRightRect(w, h, d, sw).translate(d + w, d * 1.5));
  group.add(drawRightGlue(w, h, d, sw).translate(d + w, h + d * 1.5));

  return group;
}

/**
 * Back side
 */
export function drawBackShape(
  w: number,
  h: number,
  d: number,
  sw: number
): Rect {
  const shape = new Rect();

  shape.size(w, h);
  shape.fill("#000");
  shape.stroke({
    width: sw,
    color: "red",
  });

  return shape;
}

export function drawBackBottomGlue(
  w: number,
  h: number,
  d: number,
  sw: number
): Path {
  const glue = new Path();

  glue.plot(
    `M 0 0
     l ${d / 6} ${d * 0.9}
     h ${w - d / 3}
     l ${d / 6} -${d * 0.9}
     Z`
  );
  glue.fill("#000");
  glue.stroke({
    width: sw,
    color: "red",
  });

  return glue;
}

export function drawBackSideGlue(
  w: number,
  h: number,
  d: number,
  sw: number
): Path {
  const glue = new Path();

  glue.plot(
    `M 0 0
     l ${d * 0.9} ${d / 6}
     v ${h - d / 3}
     l -${d * 0.9} ${d / 6}
     Z`
  );
  glue.fill("#000");
  glue.stroke({
    width: sw,
    color: "red",
  });

  return glue;
}

export function drawBackSide(
  w: number,
  h: number,
  d: number,
  sw: number = 2
): G {
  const group = new G();

  group.translate(d * 2 + w, 0);

  group.add(drawBackShape(w, h, d, sw).translate(0, d * 1.5));
  group.add(drawBackBottomGlue(w, h, d, sw).translate(0, d * 1.5 + h));
  group.add(drawBackSideGlue(w, h, d, sw).translate(w, d * 1.5));

  return group;
}

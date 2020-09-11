import React, { FC, useRef, useEffect } from "react";
import { SVG, G } from "@svgdotjs/svg.js";
import { mmToPx, scale as scaler } from "./helpers";
import { drawLeftSide } from "./shapes/leftSide.shape";
import { drawFrontSide } from "./shapes/frontSide.shape";
import { simpleRenderer } from "./renderers/simple.renderer";
// import {
//   drawLeftSide,
//   drawFaceSide,
//   drawRightSide,
//   drawBackSide,
// } from "./shapes";

// function renderImage(
//   width: number,
//   height: number,
//   depth: number,
//   scale: number = 1
// ): G {
//   const group = new G();

//   group.add(drawLeftSide(depth, height, depth));
//   group.add(drawFaceSide(width, height, depth));
//   group.add(drawRightSide(width, height, depth));
//   group.add(drawBackSide(width, height, depth));

//   return group;
// }

interface RendererProps {
  width?: number;
  height?: number;
  depth?: number;
  scale?: number;
}

export const Renderer: FC<RendererProps> = ({
  width = mmToPx(60),
  height = mmToPx(90),
  depth = mmToPx(30),
  scale = 1,
}) => {
  const svgEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgEl) {
      return;
    }

    const svg = SVG()
      .addTo(svgEl.current!)
      .width(scaler(297, scale))
      .height(scaler(210, scale));

    // const image = renderImage(width, height, depth, scale);

    svg.add(simpleRenderer(width, height, depth));
  }, [svgEl, width, height, depth, scale]);

  return (
    <div
      style={
        {
          // background: "white",
        }
      }
    >
      Renderer
      <div id="print" ref={svgEl} />
    </div>
  );
};

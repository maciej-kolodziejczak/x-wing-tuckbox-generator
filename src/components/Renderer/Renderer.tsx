import React, { FC, useRef, useEffect } from "react";
import { SVG, Svg } from "@svgdotjs/svg.js";
import { mmToPx, scale as scaler } from "./helpers";
import {
  frontFaceRenderer,
  backFaceRenderer,
  sidesRenderer,
  tucksRenderer,
  gluePartsRenderer,
} from "./renderers";

interface RendererProps {
  width?: number;
  height?: number;
  depth?: number;
  scale?: number;
}

// function renderTopPart(container: HTMLDivElement, s: number) {
//   const width = scale(156, s);
//   const height = scale(65, s);

//   const draw = SVG().width(width).height(height).addTo(container);

//   const lineLG = draw.group().cx(width / 2);

//   const gradient = draw
//     .gradient("linear", (add) => {
//       add.stop(0, "none");
//       add.stop(0.2, "#fff");
//       add.stop(0.5, "#fff");
//       add.stop(1, "none");
//     })
//     .from(0, 0)
//     .to(0, 1);

//   const pathL = lineLG
//     .path(
//       `m ${scale(0, s)} 0
//        v ${scale(50, s)}
//        l ${scale(8, s)} ${scale(7, s)}
//        v ${scale(13, s)}
//       `
//     )
//     .attr({
//       stroke: gradient,
//       "stroke-width": scale(0.5, s),
//     });

//   const pathR = lineLG
//     .path(
//       `m ${width} 0
//        v ${scale(50, s)}
//        l ${scale(-8, s)} ${scale(7, s)}
//       v ${scale(13, s)}
//       `
//     )
//     .attr({
//       stroke: gradient,
//       "stroke-width": scale(0.5, s),
//     });
// }

// function renderLogo(container: HTMLDivElement, s: number) {
//   const width = scale(156, s);
//   const height = scale(70, s);

//   const draw = SVG().width(width).height(height).addTo(container);

//   const imageW = scale(137, s);
//   const imageH = scale(55, s);

//   const image = draw
//     .image(
//       "https://images-cdn.fantasyflightgames.com/filer_public/ed/0f/ed0f4b13-df36-44e7-b362-3c43ed8dba42/swz_logo_bk-tm.png"
//     )
//     .width(imageW)
//     .height(imageH)
//     .center(width / 2, height / 2);

//   const lineLG = draw.group();

//   const gradient = draw
//     .gradient("linear", (add) => {
//       add.stop(0, "none");
//       add.stop(0.2, "#fff");
//       add.stop(0.5, "#fff");
//       add.stop(1, "none");
//     })
//     .from(0, 0)
//     .to(0, 1);

//   const pathL = lineLG
//     .path(
//       `m ${scale(8, s)} 0
//        v ${scale(13, s)}
//        l ${scale(-8, s)} ${scale(7, s)}
//        v ${scale(50, s)}
//       `
//     )
//     .attr({
//       stroke: gradient,
//       "stroke-width": scale(0.5, s),
//     });

//   const pathR = lineLG
//     .path(
//       `m ${width - scale(8, s)} 0
//        v ${scale(13, s)}
//        l ${scale(8, s)} ${scale(7, s)}
//       v ${scale(50, s)}
//       `
//     )
//     .attr({
//       stroke: gradient,
//       "stroke-width": scale(0.5, s),
//     });
// }

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

    frontFaceRenderer(svg, width, height, depth, scale);
    backFaceRenderer(svg, width, height, depth, scale);
    sidesRenderer(svg, width, height, depth, scale);
    tucksRenderer(svg, width, height, depth, scale);
    gluePartsRenderer(svg, width, height, depth, scale);
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

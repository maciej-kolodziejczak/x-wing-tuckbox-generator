import React, { FC, useRef, useEffect } from "react";
import { SVG } from "@svgdotjs/svg.js";

function mmToPx(v: number): number {
  return v * 3.779527559;
}

interface RendererProps {
  width?: number;
  height?: number;
  depth?: number;
}

function scale(v: number, s: number): number {
  return mmToPx(v) * s;
}

function renderTopPart(container: HTMLDivElement, s: number) {
  const width = scale(156, s);
  const height = scale(65, s);

  const draw = SVG().width(width).height(height).addTo(container);

  const lineLG = draw.group().cx(width / 2);

  const gradient = draw
    .gradient("linear", (add) => {
      add.stop(0, "none");
      add.stop(0.2, "#fff");
      add.stop(0.5, "#fff");
      add.stop(1, "none");
    })
    .from(0, 0)
    .to(0, 1);

  const pathL = lineLG
    .path(
      `m ${scale(0, s)} 0
       v ${scale(50, s)}
       l ${scale(8, s)} ${scale(7, s)}
       v ${scale(13, s)}
      `
    )
    .attr({
      stroke: gradient,
      "stroke-width": scale(0.5, s),
    });

  const pathR = lineLG
    .path(
      `m ${width} 0
       v ${scale(50, s)}
       l ${scale(-8, s)} ${scale(7, s)}
      v ${scale(13, s)}
      `
    )
    .attr({
      stroke: gradient,
      "stroke-width": scale(0.5, s),
    });
}

function renderLogo(container: HTMLDivElement, s: number) {
  const width = scale(156, s);
  const height = scale(70, s);

  const draw = SVG().width(width).height(height).addTo(container);

  const imageW = scale(137, s);
  const imageH = scale(55, s);

  const image = draw
    .image(
      "https://images-cdn.fantasyflightgames.com/filer_public/ed/0f/ed0f4b13-df36-44e7-b362-3c43ed8dba42/swz_logo_bk-tm.png"
    )
    .width(imageW)
    .height(imageH)
    .center(width / 2, height / 2);

  const lineLG = draw.group();

  const gradient = draw
    .gradient("linear", (add) => {
      add.stop(0, "none");
      add.stop(0.2, "#fff");
      add.stop(0.5, "#fff");
      add.stop(1, "none");
    })
    .from(0, 0)
    .to(0, 1);

  const pathL = lineLG
    .path(
      `m ${scale(8, s)} 0
       v ${scale(13, s)}
       l ${scale(-8, s)} ${scale(7, s)}
       v ${scale(50, s)}
      `
    )
    .attr({
      stroke: gradient,
      "stroke-width": scale(0.5, s),
    });

  const pathR = lineLG
    .path(
      `m ${width - scale(8, s)} 0
       v ${scale(13, s)}
       l ${scale(8, s)} ${scale(7, s)}
      v ${scale(50, s)}
      `
    )
    .attr({
      stroke: gradient,
      "stroke-width": scale(0.5, s),
    });
}

export const Renderer: FC<RendererProps> = ({
  width = mmToPx(60),
  height = mmToPx(90),
  depth = mmToPx(30),
}) => {
  const svgEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgEl) {
      return;
    }

    // render();
    renderLogo(svgEl.current!, 1);
    renderTopPart(svgEl.current!, 1);
  }, [svgEl]);

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

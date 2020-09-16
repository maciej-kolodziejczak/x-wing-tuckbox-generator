import React, { FC, useRef, useEffect } from "react";
import { SVG, Svg } from "@svgdotjs/svg.js";

import { useUpgradeStore } from "../UpgradeCards.context";

import { UpgradeCardsData } from "../../../types/data";
import upgradeCardsData from "../../../data/upgrades.json";

import { UpgradesRenderer } from "../../../lib/upgradesRenderer";

const data = upgradeCardsData as UpgradeCardsData;

export function mmToPx(v: number): number {
  return v * 3.779527559;
}

export function scaleMm(v: number, s: number): number {
  return mmToPx(v) * s;
}

function renderSvg(width: number, height: number): Svg {
  return SVG().width(width).height(height);
}

export const UpgradeRenderer: FC<{}> = () => {
  const container = useRef<HTMLDivElement>(null);
  const { state } = useUpgradeStore();

  useEffect(() => {
    if (!container) return;

    container.current!.innerHTML = "";

    const scale = 1;
    const renderer = new UpgradesRenderer(state.size, scale, data, state)
    const svg = renderer.render(
      scaleMm(210, 1),
      scaleMm(297, 1)
    );

    renderer.toPDF();

    svg.addTo(container.current!);
  }, [container, state]);

  return <div ref={container}></div>;
};

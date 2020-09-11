import React, { FC, useRef, useEffect } from "react";
import { SVG, Svg } from "@svgdotjs/svg.js";

import { useUpgradeStore } from "../UpgradeCards.context";

import { UpgradeCardsData } from "../../../types/data";
import upgradeCardsData from "../../../data/upgrades.json";
import { renderBody } from "../../../lib/renderBody";

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

    const scale = 1;
    const width = scaleMm(state.size.width, scale);
    const height = scaleMm(state.size.height, scale);
    const length = scaleMm(state.size.length, scale);

    const svg = renderSvg(scaleMm(297, scale), scaleMm(210, scale));
    const body = renderBody(width, height, length);

    svg.addTo(container.current!).add(body);
  }, [container, state]);

  return <div ref={container}></div>;
};

import React, { FC, useRef, useEffect } from "react";

import { useUpgradeStore } from "../UpgradeCards.context";

import { UpgradeCardsData } from "../../../types/data";
import upgradeCardsData from "../../../data/upgrades.json";

import { UpgradesRenderer } from "../../../lib/upgradesRenderer";

const data = upgradeCardsData as UpgradeCardsData;

export const UpgradeRenderer: FC<{}> = () => {
  const container = useRef<HTMLDivElement>(null);
  const { state } = useUpgradeStore();

  const scale = 1;
  let renderer = useRef<UpgradesRenderer>();

  useEffect(() => {
    if (!container) return;

    container.current!.innerHTML = "";
    renderer.current = new UpgradesRenderer(state.size, scale, data, state);

    const width = state.size.width * 2 + state.size.length * 3;
    const height = state.size.height + state.size.length * 2.5;
    renderer.current.render(width, height).addTo(container.current!);
  }, [container, state]);

  return (
    <div>
      <div ref={container}></div>
      <button onClick={() => renderer.current!.toPDF()}>Download</button>
    </div>
  );
};

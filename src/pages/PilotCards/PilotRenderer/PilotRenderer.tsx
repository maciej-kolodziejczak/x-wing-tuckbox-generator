import React, { FC, useRef, useEffect } from "react";

import { usePilotStore } from "../PilotCards.context";

import { PilotCardsData } from "../../../types/data";
import pilotsCardsData from "../../../data/pilots.json";

import { PilotsRenderer } from "../../../lib/pilotsRenderer";

const data = pilotsCardsData as PilotCardsData;

export const PilotRenderer: FC<{}> = () => {
  const container = useRef<HTMLDivElement>(null);
  const { state } = usePilotStore();

  const scale = 1;
  let renderer = useRef<PilotsRenderer>();

  useEffect(() => {
    if (!container) return;

    container.current!.innerHTML = "";
    renderer.current = new PilotsRenderer(state.size, scale, data, state);

    const width = state.size.width * 2 + state.size.length * 3;
    const height = state.size.height + state.size.length * 2.5;
    renderer.current.render(width, height).addTo(container.current!);
  }, [container, state]);

  return <div ref={container}></div>;
};

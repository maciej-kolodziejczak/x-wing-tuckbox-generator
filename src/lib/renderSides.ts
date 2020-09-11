import { G, Text, Path } from "@svgdotjs/svg.js";

import pilotCardsData from "../data/pilots.json";

import { PilotCardsState } from "../pages/PilotCards/PilotCards.reducer";
import { Faction, Ship, Pilot, PilotCardsData } from "../types/data";

const data = pilotCardsData as PilotCardsData;

export function renderLeftSide(
  l: number,
  h: number,
  state: PilotCardsState
): G {
  const group = new G();
  return group;
}

export function renderRightSide(
  l: number,
  h: number,
  state: PilotCardsState
): G {
  const group = new G();
  return group;
}

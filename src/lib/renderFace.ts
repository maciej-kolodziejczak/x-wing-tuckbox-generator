import { G, Text, Path } from "@svgdotjs/svg.js";

import { PilotCardsState } from "../pages/PilotCards/PilotCards.reducer";
import { Faction, Ship, Pilot, PilotCardsData } from "../types/data";

import pilotCardsData from "../data/pilots.json";

const data = pilotCardsData as PilotCardsData;

function getFactions(data: PilotCardsData, state: PilotCardsState): Faction[] {
  return data.filter(({ xws }) => state.data.factions.includes(xws));
}
function getShips(data: PilotCardsData, state: PilotCardsState): Ship[] {
  return getFactions(data, state)
    .flatMap(({ ships }) => ships)
    .filter(({ xws }) => state.data.ships.includes(xws));
}
function getPilots(data: PilotCardsData, state: PilotCardsState): Pilot[] {
  return getShips(data, state)
    .flatMap(({ pilots }) => pilots)
    .filter(({ xws }) => state.data.pilots.includes(xws));
}

export function renderCardHead(w: number, state: PilotCardsState): G {
  const group = new G();

  const icon = new Text();
  const title = new Text();
  const subtitle = new Text();

  const faction = getFactions(data, state)[0];

  const margin = 15;
  const iconWidth = 30;

  icon
    .x(margin)
    .y(margin / 2)
    .text(faction.icon.char)
    .font({
      size: iconWidth,
      family: "XWing",
      anchor: "start",
      "dominant-baseline": "hanging",
    })
    .fill(faction.icon.color);

  title
    .x(w - margin)
    .y(margin)
    .text(state.text.title)
    .font({
      size: 16,
      anchor: "end",
      family: "BankGothic Md BT",
      "dominant-baseline": "hanging",
    })
    .fill("#000");

  subtitle
    .x(w - margin)
    .y(margin + 14)
    .text(state.text.subtitle)
    .font({
      size: 12,
      anchor: "end",
      family: "BankGothic Md BT",
      "dominant-baseline": "hanging",
    })
    .fill("#000");

  group.add(icon).add(title).add(subtitle);

  return group;
}

function renderPilotsName(w: number, state: PilotCardsState): G {
  const group = new G();
  const pilots = getPilots(data, state)
    .sort((a, b) => b.initiative - a.initiative)
    .sort((a, b) => b.limited - a.limited);

  pilots.forEach(({ name, limited, initiative }, i) => {
    const pilot = new G();
    const pilotName = new Text();
    const pilotInitiative = new Text();

    const stars = new Array(limited).fill("•");
    const margin = 15;
    const fontSize = 10;

    pilot.translate(margin, 15 * i);

    pilotName
      .text(`${stars}${name}`)
      .font({
        size: fontSize,
        family: "BankGothic Md BT",
        "dominant-baseline": "hanging",
      })
      .fill("#000");

    pilotInitiative
      .x(w - margin * 2)
      .text(initiative.toString())
      .font({
        size: fontSize,
        anchor: "end",
        family: "BankGothic Md BT",
        "dominant-baseline": "hanging",
      });

    pilot.add(pilotName).add(pilotInitiative);

    group.add(pilot);
  });

  return group;
}

function renderCorner(state: PilotCardsState): Path {
  const corner = new Path();

  const length = 30;
  const faction = getFactions(data, state)[0];

  corner
    .plot(
      `M 0 -${length}
    v ${length}
    h ${length}`
    )
    .fill("rgba(0,0,0,0)")
    .stroke({
      width: 1,
      color: faction.icon.color,
    });

  return corner;
}

function renderShipNames(state: PilotCardsState): G {
  const group = new G();
  const ships = getShips(data, state);

  ships.forEach(({ name }, i) => {
    const ship = new Text();

    ship
      .y(-15 * i)
      .text(name)
      .font({
        size: 12,
        family: "BankGothic Md BT",
        anchor: "end",
        "dominant-baseline": "baseline",
      })
      .fill("#000");

    group.add(ship);
  });

  return group;
}

export function renderFace(w: number, h: number, state: PilotCardsState): G {
  const group = new G();
  const margin = 15;

  group.add(renderCardHead(w, state));
  group.add(renderPilotsName(w, state).translate(0, 65));
  group.add(renderCorner(state).translate(margin, h - margin));
  group.add(renderShipNames(state).translate(w - margin, h - margin * 1.5));

  return group;
}

import { PilotCardsState } from "../pages/PilotCards/PilotCards.reducer";
import { G, Text, Path, Image } from "@svgdotjs/svg.js";

import pilotCardsData from "../data/pilots.json";
import { PilotCardsData, Faction, Ship, Pilot } from "../types/data";

const data = pilotCardsData as PilotCardsData;

function getFactions(data: PilotCardsData, state: PilotCardsState): Faction[] {
  return data.filter(({ xws }) => state.data.factions.includes(xws));
}
function getShips(data: PilotCardsData, state: PilotCardsState): Ship[] {
  return getFactions(data, state)
    .flatMap(({ ships }) => ships)
    .filter(({ xws }) => state.data.ships.includes(xws));
}

function renderTuckIcon(state: PilotCardsState): Text {
  const icon = new Text();
  const faction = getFactions(data, state)[0];

  const iconWidth = 20;

  icon
    .text(faction.icon.char)
    .font({
      size: iconWidth,
      family: "XWing",
      anchor: "start",
      "dominant-baseline": "hanging",
    })
    .fill(faction.icon.color);

  return icon;
}

function renderTuckText(w: number, state: PilotCardsState): G {
  const group = new G();
  const title = new Text();
  const subtitle = new Text();

  title
    .text(state.text.title)
    .font({
      size: 12,
      anchor: "end",
      family: "BankGothic Md BT",
      "dominant-baseline": "hanging",
    })
    .fill("#000");
  subtitle
    .y(10)
    .text(state.text.subtitle)
    .font({
      size: 8,
      anchor: "end",
      family: "BankGothic Md BT",
      "dominant-baseline": "hanging",
    })
    .fill("#000");

  group.add(title).add(subtitle);

  return group;
}

function renderShipNames(state: PilotCardsState): G {
  const group = new G();
  const ships = getShips(data, state);

  ships.forEach(({ name }, i) => {
    const ship = new Text();

    ship
      .y(-10 * i)
      .text(name)
      .font({
        size: 8,
        family: "BankGothic Md BT",
        anchor: "start",
        "dominant-baseline": "baseline",
      });

    group.add(ship);
  });

  return group;
}

function renderCorner(state: PilotCardsState): Path {
  const corner = new Path();

  const length = 15;
  const faction = getFactions(data, state)[0];

  corner
    .plot(
      `M 0 -${length}
     v ${length}
     h -${length}`
    )
    .fill("rgba(0,0,0,0)")
    .stroke({
      width: 1,
      color: faction.icon.color,
    });

  return corner;
}

// function renderShipIcons(state: PilotCardsState): G {
//   const group = new G();
//   const ships = getShips(data, state);
//   const iconWidth = 25;

//   ships.forEach(({ icon }, i) => {
//     const ship = new Text();

//     if (!icon.char && !icon.icon) {
//       return;
//     }

//     ship
//       .x(iconWidth * i)
//       .y(5)
//       .text(icon.char)
//       .font({
//         size: iconWidth,
//         family: "XWingShip",
//         anchor: "middle",
//         "dominant-baseline": "hanging",
//       });

//     group.add(ship);
//   });

//   return group;
// }

export function renderTopTuck(w: number, l: number, state: PilotCardsState): G {
  const group = new G();
  const margin = 10;

  group.add(renderTuckIcon(state).translate(margin, margin / 2));
  group.add(renderTuckText(w, state).translate(w - margin, margin));
  // group.add(renderShipIcons(state).translate(margin + 30, margin / 2));

  if (l > 60) {
    group.add(renderShipNames(state).translate(margin, l - margin));
    group.add(renderCorner(state).translate(w - margin, l - margin));
  }

  return group
    .transform({
      scaleY: -1,
      scaleX: -1,
    })
    .translate(0, 8);
}

export function renderBottomTuck(
  w: number,
  l: number,
  state: PilotCardsState
): G {
  const group = new G();
  const margin = 10;

  group.add(renderTuckIcon(state).translate(margin, margin / 2));
  group.add(renderTuckText(w, state).translate(w - margin, margin));
  // group.add(renderShipIcons(state).translate(margin + 30, margin / 2));

  if (l > 60) {
    group.add(renderShipNames(state).translate(margin, l - margin));
    group.add(renderCorner(state).translate(w - margin, l - margin));
  }

  return group
    .transform({
      scaleY: -1,
      scaleX: -1,
    })
    .translate(0, 8);
}

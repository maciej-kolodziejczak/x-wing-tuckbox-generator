import React, { FC, useRef, useEffect } from "react";
import { SVG, Svg, G, Path, Text } from "@svgdotjs/svg.js";

import { usePilotStore } from "../PilotCards.context";
import { PilotCardsState } from "../PilotCards.reducer";

import { PilotCardsData, Faction, Ship, Pilot } from "../../../types/data";
import pilotsCardsData from "../../../data/pilots.json";
import { renderBody } from "../../../lib/renderBody";
import { renderFace } from "../../../lib/renderFace";
import { renderTopTuck, renderBottomTuck } from "../../../lib/renderTucks";
import { renderLeftSide, renderRightSide } from "../../../lib/renderSides";

const data = pilotsCardsData as PilotCardsData;

// function getFactions(xws: string[]): Faction[] {
//   return data.filter((faction) => xws.includes(faction.xws));
// }

// function getShips(xws: string[]): Ship[] {
//   return data
//     .flatMap(({ ships }) => ships)
//     .filter((ship) => xws.includes(ship.xws));
// }

// function getPilots(xws: string[]): Pilot[] {
//   return data
//     .flatMap(({ ships }) => ships)
//     .flatMap(({ pilots }) => pilots)
//     .filter((pilot) => xws.includes(pilot.xws))
//     .sort((a, b) => (a.initiative > b.initiative ? -1 : 1))
//     .sort((a, b) => (a.limited > b.limited ? -1 : 1));
// }

export function mmToPx(v: number): number {
  return v * 3.779527559;
}

export function scaleMm(v: number, s: number): number {
  return mmToPx(v) * s;
}

// const strokify = (shape: Path, dashed: boolean = true) =>
//   shape.fill("rgba(0,0,0,0)").stroke({
//     width: 1,
//     color: "#aaa",
//     dasharray: dashed ? "4" : "0",
//   });

function renderSvg(width: number, height: number): Svg {
  return SVG().width(width).height(height);
}

// function renderFace(
//   width: number,
//   height: number,
//   length: number,
//   state: PilotCardsState
// ): G {
//   const group = new G();
//   const margin = 15;

//   group.translate(length, length * 1.5);

//   // render faction icons
//   function renderFactionIcons(w: number, h: number, factions: Faction[]): G {
//     const group = new G();

//     factions.forEach((faction) => {
//       const icon = new Text();
//       const iconWidth = h / 10;

//       icon
//         .x(margin + iconWidth / 2)
//         .y(iconWidth)
//         .font({
//           size: iconWidth,
//           family: "XWing",
//           anchor: "start",
//         })
//         .leading(1)
//         .fill(faction.icon.color)
//         .attr({
//           "text-anchor": "middle",
//           "dominant-baseline": "baseline",
//         })
//         .text(faction.icon.char);

//       group.add(icon);
//     });

//     return group;
//   }
//   // render title
//   function renderTitle(w: number, h: number, text: string): Text {
//     const title = new Text();

//     title
//       .x(w - margin)
//       .y(margin)
//       .text(text)
//       .font({
//         size: 16,
//         family: "BankGothic Md BT",
//       })
//       .attr({ "text-anchor": "end", "dominant-baseline": "hanging" });

//     return title;
//   }
//   // render subtitle
//   function renderSubtitle(w: number, h: number, text: string): Text {
//     const subtitle = new Text();

//     subtitle
//       .x(w - margin)
//       .y(16 + margin / 2 + 5)
//       .text(text)
//       .font({
//         size: 12,
//         family: "BankGothic Md BT",
//       })
//       .attr({ "text-anchor": "end", "dominant-baseline": "hanging" });

//     return subtitle;
//   }
//   // render pilots
//   function renderPilots(w: number, h: number, pilots: Pilot[]): G {
//     const group = new G();
//     const fontSize = 10;

//     group.width(w - margin * 2).translate(margin, 65);

//     pilots.forEach((pilot, i) => {
//       const record = new G();
//       const title = new Text();
//       const initiative = new Text();

//       title
//         .y(fontSize * 1.5 * i)
//         .text(pilot.name)
//         .font({
//           size: fontSize,
//           family: "BankGothic Md BT",
//         })
//         .attr({ "text-anchor": "start", "dominant-baseline": "hanging" });

//       initiative
//         .x(w - margin * 2)
//         .y(fontSize * 1.5 * i)
//         .text(pilot.initiative.toString())
//         .font({
//           size: fontSize,
//           family: "BankGothic Md BT",
//         })
//         .attr({ "text-anchor": "end", "dominant-baseline": "hanging" });

//       record.add(title);
//       record.add(initiative);

//       group.add(record);
//     });

//     return group;
//   }
//   // render main icon
//   function renderMainIcon(w: number, h: number, factions: Faction[]): G {
//     const group = new G();

//     // ships.forEach((ship, i) => {
//     //   const icon = new Text();

//     //   icon
//     //     .x(40 * i)
//     //     .y(-20 * i)
//     //     .text(ship.icon.char)
//     //     .stroke("#fff")
//     //     .font({
//     //       size: 150,
//     //       family: "XWingShip",
//     //     })
//     //     .attr({ "text-anchor": "start" })
//     //     .fill("#ccc");

//     //   group.add(icon);
//     // });

//     const bottomCorner = new Path();
//     const lineLength = 30;

//     bottomCorner
//       .plot(
//         `M ${margin} ${h - margin - lineLength}
//        v ${lineLength}
//        h ${lineLength}`
//       )
//       .fill("rgba(0,0,0,0)")
//       .stroke({
//         width: 1,
//         color: factions[0].icon.color,
//       });

//     group.add(bottomCorner);

//     return group;
//   }
//   // render ship icons
//   // render ship name
//   function renderShipNames(w: number, h: number, ships: Ship[]): G {
//     const group = new G();
//     const fontSize = 12;

//     console.log(ships);

//     ships.forEach((ship, i) => {
//       const title = new Text();

//       title
//         .x(w - margin)
//         .y(h - margin * 1.5 - fontSize * i)
//         .text(ship.name)
//         .font({
//           size: fontSize,
//           family: "BankGothic Md BT",
//         })
//         .attr({
//           "text-anchor": "end",
//           "dominant-baseline": "baseline",
//           "text-length": w - margin * 2,
//         });

//       group.add(title);
//     });

//     return group;
//   }

//   group.add(
//     renderFactionIcons(width, height, getFactions(state.data.factions))
//   );
//   group.add(renderTitle(width, height, state.text.title));
//   group.add(renderSubtitle(width, height, state.text.subtitle));
//   group.add(renderPilots(width, height, getPilots(state.data.pilots)));
//   group.add(renderMainIcon(width, height, getFactions(state.data.factions)));
//   group.add(renderShipNames(width, height, getShips(state.data.ships)));

//   return group;
// }

export const PilotRenderer: FC<{}> = () => {
  const container = useRef<HTMLDivElement>(null);
  const { state } = usePilotStore();

  useEffect(() => {
    if (!container) return;

    const scale = 1;
    const width = scaleMm(state.size.width, scale);
    const height = scaleMm(state.size.height, scale);
    const length = scaleMm(state.size.length, scale);

    container.current!.innerHTML = "";

    const svg = renderSvg(scaleMm(297, scale), scaleMm(210, scale));
    const body = renderBody(width, height, length);
    const face = renderFace(width, height, state).translate(
      length,
      length * 1.5
    );
    const topTuck = renderTopTuck(width, length, state).translate(
      length,
      length * 0.5
    );
    const bottomTuck = renderBottomTuck(width, length, state).translate(
      length,
      length * 1.5 + height
    );
    const leftSide = renderLeftSide(length, height, state).translate(
      0,
      length * 1.5
    );
    const rightSide = renderRightSide(length, height, state).translate(
      length + width,
      length * 1.5
    );

    svg
      .addTo(container.current!)
      .add(body)
      .add(face)
      .add(topTuck)
      .add(bottomTuck)
      .add(leftSide)
      .add(rightSide);
  }, [container, state]);

  return <div ref={container}></div>;
};

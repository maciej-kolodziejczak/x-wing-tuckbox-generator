import upgradeCardsData from "../../data/upgrades.json";
import {
  UpgradeCardsData,
  UpgradeCardType,
  UpgradeCard,
} from "../../types/data";
import { UpgradeCardsState } from "../../pages/UpgradeCards/UpgradeCards.reducer";
import { G, Text, Path } from "@svgdotjs/svg.js";

const data = upgradeCardsData as UpgradeCardsData;

function getCardTypes(
  data: UpgradeCardsData,
  state: UpgradeCardsState
): UpgradeCardType[] {
  return data.filter(({ xws }) => state.data.types.includes(xws));
}

function getCards(
  data: UpgradeCardsData,
  state: UpgradeCardsState
): UpgradeCard[] {
  return getCardTypes(data, state)
    .flatMap(({ cards }) => cards)
    .filter(({ xws }) => state.data.cards.includes(xws));
}

function renderCardHead(w: number, state: UpgradeCardsState): G {
  const group = new G();

  const icon = new Text();
  const title = new Text();
  const subtitle = new Text();

  const upgradeType = getCardTypes(data, state)[0];

  const margin = 15;
  const iconWidth = 30;

  icon
    .x(margin)
    .y(margin / 2)
    .text(upgradeType.icon.char)
    .font({
      size: iconWidth,
      family: "XWing",
      anchor: "start",
      "dominant-baseline": "hanging",
    })
    .fill(upgradeType.icon.color);

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

function renderCardNames(state: UpgradeCardsState): G {
  const group = new G();
  const cards = getCards(data, state);

  cards.forEach(({ xws, name }, i) => {
    const card = new Text();

    card
      .y(10 * i)
      .text(name)
      .font({
        size: 8,
        anchor: "end",
        family: "BankGothic Md BT",
        "dominant-baseline": "hanging",
      })
      .fill("#000");

    group.add(card);
  });

  return group.translate(-15, 0);
}

function renderCorner(): Path {
  const corner = new Path();
  const length = 30;

  corner
    .plot(
      `M 0 -${length}
    v ${length}
    h ${length}`
    )
    .fill("rgba(0,0,0,0)")
    .stroke({
      width: 1,
      color: "#000",
    });

  return corner;
}

export function renderFace(
  w: number,
  h: number,
  l: number,
  state: UpgradeCardsState
): G {
  const group = new G();
  const margin = 15;

  group.add(renderCardHead(w, state).translate(l, l * 1.5));
  group.add(renderCorner().translate(l + margin, l * 1.5 + h - margin));

  if (state.config.cardNames) {
    group.add(renderCardNames(state).translate(w + l, l * 1.5 + 65));
  }

  return group;
}

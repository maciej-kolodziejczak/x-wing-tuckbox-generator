import { G, Path, Text } from "@svgdotjs/svg.js";

import { Renderer, RendererSize } from "./renderer";
import { UpgradeCardsState } from "../pages/UpgradeCards/UpgradeCards.reducer";
import { UpgradeCardsData, UpgradeCard, UpgradeType } from "../types/data";

export class UpgradesRenderer extends Renderer {
  private data: UpgradeCardsData;
  private state: UpgradeCardsState;

  private upgradeTypes: UpgradeType[];
  private upgradeCards: UpgradeCard[];

  public constructor(
    size: RendererSize,
    scale: number,
    data: UpgradeCardsData,
    state: UpgradeCardsState
  ) {
    super(size, scale);

    this.data = data;
    this.state = state;

    this.upgradeCards = this.getUpgradeCards();
    this.upgradeTypes = this.getUpgradeTypes();
  }

  // data processing
  private getUpgradeTypes(): UpgradeType[] {
    return this.data.filter(({ xws }) => this.state.data.types.includes(xws));
  }
  private getUpgradeCards(): UpgradeCard[] {
    return this.getUpgradeTypes()
      .flatMap(({ cards }) => cards)
      .filter(({ xws }) => this.state.data.cards.includes(xws));
  }

  // rendering
  private renderFaceHead(size = 16, callback?: (element: G) => void) {
    const head = new G();
    const title = new Text();
    const subtitle = new Text();

    title.text(this.state.text.title);
    title.font({
      size,
      anchor: "end",
      family: "BankGothic Md BT",
      "dominant-baseline": "hanging",
    });
    title.fill("#000");

    subtitle.text(this.state.text.subtitle);
    subtitle.font({
      size: size * 0.75,
      anchor: "end",
      family: "BankGothic Md BT",
      "dominant-baseline": "hanging",
    });
    subtitle.fill("#000");
    subtitle.y(size * 0.75);

    head.add(title);
    head.add(subtitle);

    this.svg.add(head);

    callback?.(head);
  }

  private renderFaceIcon(size = 30, callback?: (element: Text) => void) {
    const icon = new Text();
    const type = this.upgradeTypes[0];

    icon.text(type.icon.char);
    icon.font({
      size,
      family: "XWing",
      anchor: "start",
      "dominant-baseline": "hanging",
    });
    icon.fill(type.icon.color || "#aaa");

    this.svg.add(icon);

    callback?.(icon);
  }

  private renderCardNames(size = 10, callback?: (element: G) => void) {
    const list = new G();
    const cards = this.upgradeCards;

    cards.forEach(({ name, limited }, i) => {
      const cardName = new Text();
      const dots = new Array(limited).fill("•");

      cardName.text(`${dots}${name}`);
      cardName.font({
        size,
        anchor: "end",
        family: "BankGothic Md BT",
        "dominant-baseline": "hanging",
      });
      cardName.fill("#000");
      cardName.y(size * i);

      list.add(cardName);
    });

    this.svg.add(list);

    callback?.(list);
  }

  private renderCardTypeIcon(size = 100, callback?: (element: Text) => void) {
    const icon = new Text();
    const type = this.upgradeTypes[0];

    icon.text(type.icon.char);
    icon.font({
      size,
      family: "XWing",
      anchor: "start",
      "dominant-baseline": "baseline",
    });
    icon.fill("#ccc");

    this.svg.add(icon);

    callback?.(icon);
  }

  private renderCorner(size = 30, callback?: (element: Path) => void) {
    const path = new Path();

    path.plot(
      `M 0 ${-size}
       v ${size}
       h -${size}`
    );
    path.stroke({
      color: "#aaa",
      width: 2,
    });
    path.fill("rgba(0,0,0,0)");

    this.svg.add(path);

    callback?.(path);
  }

  protected renderLeftSide() {
    this.renderFaceIcon(25, (element) => {
      element.transform({
        rotate: -90,
        origin: [12.5, 12.5],
      });
      element.translate(
        -25 / 4,
        this.length * 1.5 + this.height - this.sideMargin * 4
      );
      element.cy(this.length / 2);
    });
    this.renderFaceHead(14, (element) => {
      element.transform({
        rotate: 270,
        origin: [0, 0],
      });
      element.translate(this.sideMargin, this.length * 1.5 + this.sideMargin);
    });
  }

  protected renderRightSide() {
    const group = new G();
    return group;
  }

  protected renderBackSide() {
    this.renderFaceHead(16, (element) => {
      element.translate(
        this.width + this.length - this.faceMargin,
        this.length * 1.5 + this.faceMargin
      );
    });
    this.renderFaceIcon(30, (element) => {
      element.translate(
        this.length + this.faceMargin,
        this.length * 1.5 + this.faceMargin / 2
      );
    });
    this.renderCardTypeIcon(100, (element) => {
      element.translate(
        this.length + this.faceMargin,
        this.length * 1.5 + this.height - this.faceMargin * 2.5
      );
    });
    this.renderCorner(30, (element) => {
      element.translate(
        this.length + this.width - this.faceMargin,
        this.length * 1.5 + this.height - this.faceMargin
      );
    });

    if (this.state.config.cardNames) {
      this.renderCardNames(10, (element) => {
        element.translate(
          this.length + this.width - this.faceMargin,
          this.length * 1.5 + 65
        );
      });
    }
  }

  protected renderFrontSide() {
    this.renderFaceHead(16, (element) => {
      element.translate(
        this.length * 2 + this.width * 2 - this.faceMargin,
        this.length * 1.5 + this.faceMargin * 2
      );
    });
    this.renderFaceIcon(30, (element) => {
      element.translate(
        this.length * 2 + this.width + this.faceMargin * 1.5,
        this.length * 1.5 + this.faceMargin * 1.5
      );
    });
    this.renderCardTypeIcon(140, (element) => {
      element.translate(
        this.length * 2 + this.width + this.faceMargin,
        this.length * 1.5 + this.height - this.faceMargin * 3
      );
    });
    this.renderCorner(30, (element) => {
      element.translate(
        this.length * 2 + this.width * 2 - this.faceMargin,
        this.length * 1.5 + this.height - this.faceMargin
      );
    });
  }

  protected renderTopTuck() {
    const group = new G();
    return group;
  }
  protected renderBottomTuck() {
    const group = new G();
    return group;
  }
}

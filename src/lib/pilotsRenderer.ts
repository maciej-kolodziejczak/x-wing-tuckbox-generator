import { G, Path, Text } from "@svgdotjs/svg.js";

import { Renderer, RendererSize } from "./renderer";
import { PilotCardsState } from "../pages/PilotCards/PilotCards.reducer";
import { PilotCardsData, Faction, Pilot, Ship } from "../types/data";

export class PilotsRenderer extends Renderer {
  private data: PilotCardsData;
  private state: PilotCardsState;

  private factions: Faction[];
  private ships: Ship[];
  private pilots: Pilot[];

  public constructor(
    size: RendererSize,
    scale: number,
    data: PilotCardsData,
    state: PilotCardsState
  ) {
    super(size, scale);

    this.data = data;
    this.state = state;

    this.factions = this.getFactions();
    this.ships = this.getShips();
    this.pilots = this.getPilots();
  }

  private getFactions(): Faction[] {
    return this.data.filter(({ xws }) =>
      this.state.data.factions.includes(xws)
    );
  }

  private getShips(): Ship[] {
    return this.getFactions()
      .flatMap(({ ships }) => ships)
      .filter(({ xws }) => this.state.data.pilots.includes(xws));
  }

  private getPilots(): Pilot[] {
    return this.getFactions()
      .flatMap(({ ships }) => ships)
      .flatMap(({ pilots }) => pilots)
      .filter(({ xws }) => this.state.data.pilots.includes(xws));
  }

  private renderHeadText(size: number): G {
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

    return head;
  }

  private renderHeadIcon(size: number): Text {
    const icon = new Text();
    const faction = this.factions[0];

    icon.text(faction.icon.char);
    icon.font({
      size,
      family: "XWing",
      anchor: "start",
      "dominant-baseline": "hanging",
    });
    icon.fill(faction.icon.color || "#aaa");

    this.svg.add(icon);

    return icon;
  }

  private renderCorner(size: number): Path {
    const path = new Path();
    const faction = this.factions[0];

    path.plot(
      `M 0 ${-size}
       v ${size}
       h -${size}`
    );
    path.stroke({
      color: faction.icon.color,
      width: 2,
    });
    path.fill("rgba(0,0,0,0)");

    this.svg.add(path);

    return path;
  }

  protected renderLeftSide(): void {
    const icon = this.renderHeadIcon(this.sideIconSize);
    const head = this.renderHeadText(this.sideFontSize);

    icon.transform({
      rotate: 90,
      origin: [0, 0],
      translate: [
        this.length - this.sideMargin + 4,
        this.length * 1.5 + this.sideMargin,
      ],
    });

    head.transform({
      rotate: 90,
      origin: [0, 0],
      translate: [
        this.length - this.sideMargin,
        this.length * 1.5 + this.height - this.sideMargin,
      ],
    });
  }

  protected renderRightSide(): void {
    const icon = this.renderHeadIcon(this.sideIconSize);
    const head = this.renderHeadText(this.sideFontSize);

    icon.transform({
      rotate: -90,
      origin: [0, 0],
      translate: [
        this.length + this.width + this.sideMargin - 4,
        this.length * 1.5 + this.height - this.sideMargin,
      ],
    });

    head.transform({
      rotate: -90,
      origin: [0, 0],
      translate: [
        this.length + this.width + this.sideMargin,
        this.length * 1.5 + this.sideMargin,
      ],
    });
  }

  protected renderBackSide(): void {
    const icon = this.renderHeadIcon(this.headIconSize);
    const head = this.renderHeadText(this.headFontSize);
    const corner = this.renderCorner(30);

    icon.transform({
      translate: [
        this.length + this.faceMargin,
        this.length * 1.5 + this.faceMargin / 2,
      ],
    });

    head.transform({
      translate: [
        this.width + this.length - this.faceMargin,
        this.length * 1.5 + this.faceMargin,
      ],
    });

    corner.transform({
      translate: [
        this.length + this.width - this.faceMargin,
        this.length * 1.5 + this.height - this.faceMargin,
      ],
    });
  }

  protected renderFrontSide(): void {
    const icon = this.renderHeadIcon(this.headIconSize);
    const head = this.renderHeadText(this.headFontSize);
    const corner = this.renderCorner(30);

    icon.transform({
      translate: [
        this.length * 2 + this.width + this.faceMargin * 1.5,
        this.length * 1.5 + this.faceMargin * 1.5,
      ],
    });

    head.transform({
      translate: [
        this.length * 2 + this.width * 2 - this.faceMargin,
        this.length * 1.5 + this.faceMargin * 2,
      ],
    });

    corner.transform({
      translate: [
        this.length * 2 + this.width * 2 - this.faceMargin,
        this.length * 1.5 + this.height - this.faceMargin,
      ],
    });
  }

  protected renderTopTuck(): void {
    const icon = this.renderHeadIcon(this.tuckIconSize);
    const head = this.renderHeadText(this.tuckFontSize);

    icon.transform({
      rotate: 180,
      origin: [0, 0],
      translate: [
        this.length + this.width - this.tuckMargin,
        this.length * 1.5 - this.tuckMargin + 4,
      ],
    });

    head.transform({
      scale: [-1, -1],
      origin: [0, 0],
      translate: [
        this.length + +this.tuckMargin,
        this.length * 1.5 - this.tuckMargin,
      ],
    });

    if (this.length > 65) {
      const corner = this.renderCorner(15);

      corner.transform({
        scale: [-1, -1],
        translate: [
          this.length + this.tuckMargin / 2 + 18,
          this.length / 2 + this.tuckMargin + 15,
        ],
      });
    }
  }

  protected renderBottomTuck(): void {
    const icon = this.renderHeadIcon(this.tuckIconSize);
    const head = this.renderHeadText(this.tuckFontSize);

    icon.transform({
      translate: [
        this.length + this.tuckMargin,
        this.length * 1.5 + this.height + this.tuckMargin - 4,
      ],
    });

    head.transform({
      translate: [
        this.length + this.width - this.tuckMargin,
        this.length * 1.5 + this.height + this.tuckMargin,
      ],
    });

    if (this.length > 65) {
      const corner = this.renderCorner(15);

      corner.transform({
        translate: [
          this.length + this.width - this.tuckMargin,
          this.length * 1.5 + this.height + this.length - this.tuckMargin,
        ],
      });
    }
  }
}

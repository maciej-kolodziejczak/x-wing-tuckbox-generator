import { SVG, Path } from "@svgdotjs/svg.js";
import fonts from '../data/fonts.json';

export interface RendererSize {
  width: number;
  height: number;
  length: number;
}

export abstract class Renderer {
  protected svg = SVG();

  protected width: number;
  protected height: number;
  protected length: number;
  protected scale: number;

  protected faceMargin = 15;
  protected sideMargin = 10;
  protected tuckMargin = 12;

  protected headFontSize = 16
  protected headIconSize = 30;
  protected sideFontSize = 14;
  protected sideIconSize = 25;
  protected tuckFontSize = 12;
  protected tuckIconSize = 20;

  public constructor(size: RendererSize, scale: number) {
    const { width, height, length } = size;

    this.width = Renderer.scaleMm(width, scale);
    this.height = Renderer.scaleMm(height, scale);
    this.length = Renderer.scaleMm(length, scale);
    this.scale = scale;
  }

  public render(width: number, height: number) {
    // typings are not complete, fontface method does exist
    // @ts-ignore
    this.svg.fontface('XWing', fonts.XWing);
    // @ts-ignore
    this.svg.fontface('XWingShips', fonts.XWingShips);
    // @ts-ignore
    this.svg.fontface('BankGothic Md BT', fonts.BankGothicMdBT)


    this.svg.width(width).height(height);
    this.renderCutShape();
    this.renderFoldshape();
    this.renderLeftSide();
    this.renderRightSide();
    this.renderBackSide();
    this.renderFrontSide();
    this.renderTopTuck();
    this.renderBottomTuck();

    return this.svg;
  }

  public toPDF() {
    const blob = new Blob([this.svg.node.outerHTML], { type: 'image/svg+xml;charset=utf-8' });
    const blobURL = URL.createObjectURL(blob);

    window.open(blobURL, '_blank');
  }

  private renderCutShape() {
    const { width: w, height: h, length: l } = this;
    const cutShape = new Path();

    cutShape
      .plot(
        `M 0 ${l * 1.5}
         a ${l / 1.5} ${l / 1.5} 0 0 1 ${l / 1.5} -${l / 1.5}
         h ${l / 3}
         v 0 ${l / 1.5}
         v -${l}
         a ${l / 2} ${l / 2} 0 0 1 ${l / 2} -${l / 2}
         h ${w - l}
         a ${l / 2} ${l / 2} 0 0 1 ${l / 2} ${l / 2}
         v ${l}
         m 0 -${l / 1.5}
         h ${l / 3}
         a ${l / 1.5} ${l / 1.5} 0 0 1 ${l / 1.5} ${l / 1.5}
         h ${w}
         l ${l * 0.9} ${l / 6}
         v ${h - l / 3}
         l ${-l * 0.9} ${l / 6}
         l -${l / 6} ${l * 0.9}
         h -${w - l / 3}
         l -${l / 6} -${l * 0.9}
         l -${l / 6} ${l * 0.9}
         h -${l - l / 3}
         l -${l / 6} -${l * 0.9}
         v ${l}
         h -${w}
         v -${l}
         l -${l / 6} ${l * 0.9}
         h -${l - l / 3}
         l -${l / 6} -${l * 0.9}
         v -${h}`
      )
      .fill("#fff")
      .stroke({
        width: 1,
        color: "#aaa",
      });

    this.svg.add(cutShape);
  }

  private renderFoldshape() {
    const { width: w, height: h, length: l } = this;
    const foldShape = new Path();

    foldShape
      .plot(
        `M 0 ${l * 1.5}
         h ${l}
         v ${h}
         h -${l}
         m ${l} 0
         h ${w}
         v ${-h}
         m 0 ${h}
         h ${l}
         v -${h}
         m 0 ${h}
         h ${w}
         v -${h}
         m -${w} 0
         h -${l}
         h -${w}
         m 0 -${l}
         h ${w}
    `
      )
      .fill("rgba(0,0,0,0)")
      .stroke({
        width: 1,
        color: "#aaa",
        dasharray: "4",
      });

    this.svg.add(foldShape);
  }

  protected abstract renderLeftSide(): void;
  protected abstract renderRightSide(): void;
  protected abstract renderBackSide(): void;
  protected abstract renderFrontSide(): void;
  protected abstract renderTopTuck(): void;
  protected abstract renderBottomTuck(): void;

  protected static mmToPx(value: number): number {
    return value * 3.779527559;
  }

  protected static scalePx(value: number, scale: number): number {
    return value * scale;
  }

  protected static scaleMm(value: number, scale: number) {
    return this.scalePx(this.mmToPx(value), scale);
  }
}

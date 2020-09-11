import { G } from "@svgdotjs/svg.js";
import { drawLeftSide } from "../shapes/leftSide.shape";
import { drawFrontSide } from "../shapes/frontSide.shape";
import { drawRightSide } from "../shapes/rightSide.shape";
import { drawBackSide } from "../shapes/backSide.shape";
import {
  drawFrontGlueParts,
  drawBackGlueParts,
} from "../shapes/glueParts.shape";
import { drawRightGlue } from "../shapes";

export function simpleRenderer(w: number, h: number, d: number): G {
  const group = new G();
  const topGroup = new G();
  const mainGroup = new G();
  const bottomGroup = new G();

  // const leftSidePos = [0, 0];
  // const frontSidePos = [d, 0];
  // const frontGluePos = [0, 0];
  // const rightSidePos = [d + w, 0];
  // const backSidePos = [d + w + d, 0];
  // const backGluePos = backSidePos;

  // group.add(drawLeftSide(d, h).translate(leftSidePos[0], leftSidePos[1]));
  // group.add(drawFrontSide(w, h).translate(frontSidePos[0], frontSidePos[1]));
  // group.add(drawRightSide(d, h).translate(rightSidePos[0], rightSidePos[1]));
  // group.add(drawBackSide(w, h).translate(backSidePos[0], backSidePos[1]));
  // group.add(
  //   drawFrontGlueParts(w, h, d * 0.9).translate(
  //     frontGluePos[0],
  //     frontGluePos[1]
  //   )
  // );
  // group.add(
  //   drawBackGlueParts(w, h, d * 0.9).translate(backGluePos[0], backGluePos[1])
  // );

  mainGroup.add(drawLeftSide(d, h));
  mainGroup.add(drawFrontSide(w, h).translate(d, 0));
  mainGroup.add(drawRightSide(d, h).translate(d + w, 0));
  mainGroup.add(drawBackSide(w, h).translate(d + w + d, 0));

  // bottomGroup.add(drawLeftGlue())

  group.add(topGroup.translate(0, 0));
  group.add(mainGroup.translate(0, d * 1.5));
  group.add(bottomGroup.translate(0, d * 1.5 + h));

  return group;
}

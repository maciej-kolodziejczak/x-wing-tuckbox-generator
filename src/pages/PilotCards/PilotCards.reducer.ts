import { Reducer } from "react";

export interface PilotDataState {
  pilots: string[];
  ships: string[];
  factions: string[];
}
export interface PilotConfigState {
  shipName: boolean;
  initiative: boolean;
}
export interface PilotTextState {
  title: string;
  subtitle: string;
}
export interface PilotSizeState {
  width: number;
  height: number;
  length: number;
}

export interface PilotCardsState {
  data: PilotDataState;
  text: PilotTextState;
  size: PilotSizeState;
  config: PilotConfigState;
}

export type PilotCardsActions =
  | { type: "setData"; payload: Partial<PilotDataState> }
  | { type: "setText"; payload: Partial<PilotTextState> }
  | { type: "setSize"; payload: Partial<PilotSizeState> }
  | { type: "setConfig"; payload: Partial<PilotConfigState> };

export const initialState: PilotCardsState = {
  data: {
    ships: ["ship:asf01bwing"],
    pilots: [
      "pilot:bladesquadronveteran",
      "pilot:bluesquadronpilot",
      "pilot:braylenstramm",
      "pilot:tennumb",
      "pilot:ginamoonsong",
      "pilot:zeborrelios",
    ],
    factions: ["faction:rebelalliance"],
  },
  text: {
    title: "Pilot Cards",
    subtitle: "Limited Pilots",
  },
  size: {
    width: 63,
    height: 92,
    length: 20,
  },
  config: {
    shipName: true,
    initiative: true,
  },
};

export const reducer: Reducer<PilotCardsState, PilotCardsActions> = function (
  state,
  action
) {
  switch (action.type) {
    case "setData": {
      return { ...state, data: { ...state.data, ...action.payload } };
    }
    case "setText": {
      return { ...state, text: { ...state.text, ...action.payload } };
    }
    case "setSize": {
      return { ...state, size: { ...state.size, ...action.payload } };
    }
    case "setConfig": {
      return { ...state, config: { ...state.config, ...action.payload } };
    }
    default:
      return state;
  }
};

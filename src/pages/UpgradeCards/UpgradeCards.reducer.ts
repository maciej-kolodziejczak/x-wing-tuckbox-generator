import { Reducer } from "react";

export interface UpgradeDataState {
  types: string[];
  cards: string[];
}

export interface UpgradeTextState {
  title: string;
  subtitle: string;
}

export interface UpgradeSizeState {
  width: number;
  height: number;
  length: number;
}

export interface UpgradeConfigState {
  cardNames: boolean;
}

export interface UpgradeCardsState {
  data: UpgradeDataState;
  text: UpgradeTextState;
  size: UpgradeSizeState;
  config: UpgradeConfigState;
}

export type UpgradeCardsActions =
  | { type: "setData"; payload: Partial<UpgradeDataState> }
  | { type: "setText"; payload: Partial<UpgradeTextState> }
  | { type: "setSize"; payload: Partial<UpgradeSizeState> }
  | { type: "setConfig"; payload: Partial<UpgradeConfigState> };

export const initialState: UpgradeCardsState = {
  data: {
    types: ["upgradeType:astromech"],
    cards: [],
  },
  text: {
    title: "Upgrade Cards",
    subtitle: "Astromech",
  },
  size: {
    width: 63,
    height: 92,
    length: 15,
  },
  config: {
    cardNames: false,
  },
};

export const reducer: Reducer<
  UpgradeCardsState,
  UpgradeCardsActions
> = function (state, action) {
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

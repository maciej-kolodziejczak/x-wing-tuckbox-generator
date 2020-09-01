export type PilotCardsData = Faction[];

export interface Faction {
  xws: string;
  name: string;
  icon: string;
  ships: Ship[];
}

export interface Ship {
  xws: string;
  name: string;
  icon: string;
  size: "Small" | "Medium" | "Large";
  faction: string;
  pilots: Pilot[];
}

export interface Pilot {
  xws: string;
  name: string;
  initiative: number;
  limited: number;
  image: string;
  artwork: string;
  faction: string;
  ship: string;
}

export type UpgradeCardsData = UpgradeCardType[];

export interface UpgradeCardType {
  xws: string;
  name: string;
  cards: UpgradeCard[];
}

export interface UpgradeCard {
  xws: string;
  name: string;
}

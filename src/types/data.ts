export type PilotCardsData = Faction[];

export interface Faction {
  xws: string;
  name: string;
  icon: {
    icon: string;
    char: string;
    color: string;
  };
  ships: Ship[];
}

export interface Ship {
  xws: string;
  name: string;
  icon: {
    icon: string;
    char: string;
    color: string;
  };
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

export type DataRecordType = {
  xws: string;
  name: string;
  [key: string]: any;
};

export type UpgradeCardsData = UpgradeCardType[];

export interface UpgradeCardType {
  xws: string;
  name: string;
  icon: {
    icon: string;
    char: string;
    color: string;
  };
  cards: UpgradeCard[];
}

export interface UpgradeCard {
  xws: string;
  name: string;
}

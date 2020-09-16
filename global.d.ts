import { PilotCardsData, UpgradeCardsData } from "./src/types/data";

declare module "src/data/pilots.json" {
  export default PilotCardsData;
}

declare module "src/data/upgrades.json" {
  export default UpgradeCardsData;
}

declare module "save-svg-as-png" {
  export default any;
}

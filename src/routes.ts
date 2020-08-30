import { PilotCards } from "./pages/PilotCards/PilotCards";
import { UpgradeCards } from "./pages/UpgradeCards/UpgradeCards";
import { FAQ } from "./pages/FAQ/FAQ";

export const routes = [
  {
    name: "Pilot Cards",
    path: "/pilot-cards",
    component: PilotCards,
  },
  {
    name: "Upgrade Cards",
    path: "/upgrade-cards",
    component: UpgradeCards,
  },
  {
    name: "FAQ",
    path: "/faq",
    component: FAQ,
  },
];

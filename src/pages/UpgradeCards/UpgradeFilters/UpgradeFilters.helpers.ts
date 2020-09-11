import { useMemo } from "react";

import {
  UpgradeCard,
  UpgradeCardType,
  UpgradeCardsData,
} from "../../../types/data";
import { UpgradeCardsState } from "../UpgradeCards.reducer";

function mapToOption({ xws, name }: UpgradeCard | UpgradeCardType) {
  return { value: xws, label: name };
}

export function useCardTypesOptions(data: UpgradeCardsData) {
  return useMemo(() => data.map(mapToOption), [data]);
}

export function useCardsOptions(
  data: UpgradeCardsData,
  state: UpgradeCardsState
) {
  return useMemo(
    () =>
      data
        .filter(({ xws }) => state.data.types.includes(xws))
        .flatMap(({ cards }) => cards)
        .map(mapToOption),
    [data, state.data.types]
  );
}

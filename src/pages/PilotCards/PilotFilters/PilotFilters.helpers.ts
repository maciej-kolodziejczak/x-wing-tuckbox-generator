import { useMemo } from "react";
import { PilotCardsData, Faction, Ship, Pilot } from "../../../types/data";
import { PilotCardsState } from "../PilotCards.reducer";

function mapToOption({ xws, name }: Faction | Ship | Pilot) {
  return { value: xws, label: name };
}

export function useFactionsOptions(data: PilotCardsData) {
  return useMemo(() => data.map(mapToOption), [data]);
}

export function useShipsOptions(data: PilotCardsData, state: PilotCardsState) {
  const ships = data.flatMap(({ ships }) => ships);

  return useMemo(
    () =>
      ships
        .filter(
          ({ faction }) =>
            !state.data.factions.length || state.data.factions.includes(faction)
        )
        .map(mapToOption),
    [ships, state.data.factions]
  );
}

export function usePilotsOptions(data: PilotCardsData, state: PilotCardsState) {
  const ships = data.flatMap(({ ships }) => ships);
  const pilots = ships.flatMap(({ pilots }) => pilots);

  return useMemo(
    () =>
      pilots
        .filter(
          ({ faction }) =>
            !state.data.factions.length || state.data.factions.includes(faction)
        )
        .filter(
          ({ ship }) =>
            !state.data.ships.length || state.data.ships.includes(ship)
        )
        .map(mapToOption),
    [pilots, state.data.factions, state.data.ships]
  );
}

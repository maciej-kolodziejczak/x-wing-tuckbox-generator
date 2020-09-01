import React, { FC, useReducer, useMemo, Reducer } from "react";
import { Container } from "../../components/Container/Container";

import { PilotCardsData, Faction, Ship, Pilot } from "../../types/data";
import pilotsCardData from "../../data/pilots.json";

import { Content } from "../../components/Content/Content";
import { Select } from "../../components/FormElements/Select/Select";
import { SectionHeader } from "../../components/SectionHeader/SectionHeader";
import { Ruler } from "../../components/Ruler/Ruler";

interface PilotCardsState {
  factions: string[];
  ships: string[];
  pilots: string[];
}

type PilotCardsActions =
  | { type: "setFactions"; payload: string[] }
  | { type: "setShips"; payload: string[] }
  | { type: "setPilots"; payload: string[] };

const initialState: PilotCardsState = {
  factions: [],
  ships: [],
  pilots: [],
};

const reducer: Reducer<PilotCardsState, PilotCardsActions> = function (
  state,
  action
) {
  switch (action.type) {
    case "setFactions":
      return {
        ...state,
        factions: action.payload,
        ships: [],
      };
    case "setShips":
      return {
        ...state,
        ships: action.payload,
        pilots: [],
      };
    case "setPilots":
      return {
        ...state,
        pilots: action.payload,
      };
    default:
      return state;
  }
};

function mapToOption({ xws, name }: Faction | Ship | Pilot) {
  return { value: xws, label: name };
}

export const PilotCards: FC<{}> = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const factions = pilotsCardData as PilotCardsData;
  const ships = factions.flatMap(({ ships }) => ships);
  const pilots = ships.flatMap(({ pilots }) => pilots);

  const factionOptions = factions.map(mapToOption);
  const shipsOptions = useMemo(() => {
    if (!state.factions.length) {
      return ships.map(mapToOption);
    }

    return ships
      .filter(({ faction }) => state.factions.includes(faction))
      .map(mapToOption);
  }, [ships, state.factions]);
  const pilotOptions = useMemo(() => {
    if (!state.factions.length) {
      return pilots.map(mapToOption);
    }

    if (!state.ships.length) {
      return pilots
        .filter(({ faction }) => state.factions.includes(faction))
        .map(mapToOption);
    }

    return pilots
      .filter(({ faction }) => state.factions.includes(faction))
      .filter(({ ship }) => state.ships.includes(ship))
      .map(mapToOption);
  }, [pilots, state.ships, state.factions]);

  return (
    <div>
      <Container>
        <Content title="Pilot Cards">
          <SectionHeader>Choose faction, ships and pilots</SectionHeader>
          <Select
            options={factionOptions}
            selected={state.factions}
            onChange={(value) => {
              dispatch({ type: "setFactions", payload: value });
            }}
          />
          <Select
            options={shipsOptions}
            selected={state.ships}
            onChange={(value) => {
              dispatch({ type: "setShips", payload: value });
            }}
          />
          <Select
            options={pilotOptions}
            selected={state.pilots}
            onChange={(value) => {
              dispatch({ type: "setPilots", payload: value });
            }}
          />
          <Ruler orientation="horizontal" spacing="top" />
          <SectionHeader>Choose labels and icons</SectionHeader>
        </Content>
      </Container>
    </div>
  );
};

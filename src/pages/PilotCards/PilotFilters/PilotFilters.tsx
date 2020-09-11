import "./PilotFilters.css";

import React, { FC } from "react";

import pilotsCardData from "../../../data/pilots.json";
import { usePilotStore } from "../PilotCards.context";
import { PilotCardsData } from "../../../types/data";

import {
  useFactionsOptions,
  useShipsOptions,
  usePilotsOptions,
} from "./PilotFilters.helpers";

import { Ruler } from "../../../components/Ruler/Ruler";
import { Input } from "../../../components/FormElements/Input/Input";
import { Select } from "../../../components/FormElements/Select/Select";
import { SectionHeader } from "../../../components/SectionHeader/SectionHeader";
import { Checkbox } from "../../../components/FormElements/Checkbox/Checkbox";

const data = pilotsCardData as PilotCardsData;

export const PilotFilters: FC<{}> = () => {
  const { state, dispatch } = usePilotStore();

  // prepare options
  const factionsOpts = useFactionsOptions(data);
  const shipsOpts = useShipsOptions(data, state);
  const pilotsOpts = usePilotsOptions(data, state);

  return (
    <div className="pilot-filters">
      <SectionHeader>Choose faction, ships and pilots</SectionHeader>
      <Select
        label="Select factions"
        options={factionsOpts}
        selected={state.data.factions}
        onChange={(value) => {
          dispatch({ type: "setData", payload: { factions: value } });
        }}
      />
      <Select
        label="Select ships"
        options={shipsOpts}
        selected={state.data.ships}
        onChange={(value) => {
          dispatch({ type: "setData", payload: { ships: value } });
        }}
      />
      <Select
        label="Select pilots"
        options={pilotsOpts}
        selected={state.data.pilots}
        onChange={(value) => {
          dispatch({ type: "setData", payload: { pilots: value } });
        }}
      />
      <Ruler orientation="horizontal" spacing="top" />
      <SectionHeader>Choose labels and icons</SectionHeader>
      <Input
        label="Box title"
        value={state.text.title}
        onChange={(value) => {
          dispatch({ type: "setText", payload: { title: value } });
        }}
      />
      <Input
        label="Box subtitle"
        value={state.text.subtitle}
        onChange={(value) => {
          dispatch({ type: "setText", payload: { subtitle: value } });
        }}
      />
      <Ruler orientation="horizontal" spacing="top" />
      <SectionHeader>Choose size and options</SectionHeader>
      <Input
        label="Width"
        value={state.size.width.toString()}
        onChange={(value) => {
          dispatch({ type: "setSize", payload: { width: parseInt(value) } });
        }}
        isNumber
      />
      <Input
        label="Height"
        value={state.size.height.toString()}
        onChange={(value) => {
          dispatch({ type: "setSize", payload: { height: parseInt(value) } });
        }}
        isNumber
      />
      <Input
        label="Length"
        value={state.size.length.toString()}
        onChange={(value) => {
          dispatch({ type: "setSize", payload: { length: parseInt(value) } });
        }}
        isNumber
      />
      <Checkbox
        label="Show ship name?"
        checked={state.config.shipName}
        onChange={(value) => {
          dispatch({ type: "setConfig", payload: { shipName: value } });
        }}
      />
      <Checkbox
        label="Show initiative?"
        checked={state.config.initiative}
        onChange={(value) => {
          dispatch({ type: "setConfig", payload: { initiative: value } });
        }}
      />
    </div>
  );
};

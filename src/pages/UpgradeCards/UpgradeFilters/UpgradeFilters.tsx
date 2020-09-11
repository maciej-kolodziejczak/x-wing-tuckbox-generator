import "./UpgradeFilters.css";

import React, { FC } from "react";

import upgradeCardData from "../../../data/upgrades.json";
import { useUpgradeStore } from "../UpgradeCards.context";
import { UpgradeCardsData } from "../../../types/data";

import { Ruler } from "../../../components/Ruler/Ruler";
import { Input } from "../../../components/FormElements/Input/Input";
import { Select } from "../../../components/FormElements/Select/Select";
import { SectionHeader } from "../../../components/SectionHeader/SectionHeader";
import { Checkbox } from "../../../components/FormElements/Checkbox/Checkbox";
import { useCardTypesOptions, useCardsOptions } from "./UpgradeFilters.helpers";

const data = upgradeCardData as UpgradeCardsData;

export const UpgradeFilters: FC<{}> = () => {
  const { state, dispatch } = useUpgradeStore();

  // prepare options
  const typeOpts = useCardTypesOptions(data);
  const cardsOpts = useCardsOptions(data, state);

  return (
    <div className="upgrade-filters">
      <SectionHeader>Choose card type and cards</SectionHeader>
      <Select
        label="Select type"
        options={typeOpts}
        selected={state.data.types}
        onChange={(value) => {
          dispatch({ type: "setData", payload: { types: value } });
        }}
      />
      <Select
        label="Select cards"
        options={cardsOpts}
        selected={state.data.cards}
        onChange={(value) => {
          dispatch({ type: "setData", payload: { cards: value } });
        }}
      />
      <Ruler orientation="horizontal" spacing="top" />
      <SectionHeader>Choose labels</SectionHeader>
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
        label="Show card names?"
        checked={state.config.cardNames}
        onChange={(value) => {
          dispatch({ type: "setConfig", payload: { cardNames: value } });
        }}
      />
    </div>
  );
};

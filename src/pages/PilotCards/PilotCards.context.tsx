import React, { createContext, useContext, useReducer, FC } from "react";
import {
  reducer,
  initialState,
  PilotCardsActions,
  PilotCardsState,
} from "./PilotCards.reducer";

interface PilotsContextType {
  state: PilotCardsState;
  dispatch: React.Dispatch<PilotCardsActions>;
}

const PilotContext = createContext<PilotsContextType | null>(null);

export const PilotStateProvider: FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PilotContext.Provider value={{ state, dispatch }}>
      {children}
    </PilotContext.Provider>
  );
};

export function usePilotStore() {
  return useContext(PilotContext)!;
}

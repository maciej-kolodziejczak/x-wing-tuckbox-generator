import React, { createContext, useContext, useReducer, FC } from "react";
import {
  reducer,
  initialState,
  UpgradeCardsState,
  UpgradeCardsActions,
} from "./UpgradeCards.reducer";

interface UpgradeContextType {
  state: UpgradeCardsState;
  dispatch: React.Dispatch<UpgradeCardsActions>;
}

const UpgradeContext = createContext<UpgradeContextType | null>(null);

export const UpgradeStateProvider: FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UpgradeContext.Provider value={{ state, dispatch }}>
      {children}
    </UpgradeContext.Provider>
  );
};

export function useUpgradeStore() {
  return useContext(UpgradeContext)!;
}

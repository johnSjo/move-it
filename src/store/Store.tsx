import { createContext, FunctionComponent, useContext, useState } from 'react';
import initialState from './initialState.json';
import settings from './settings.json';
import { Settings, State, StateContext } from './Types';

const Context = createContext<StateContext | undefined>(undefined);

const StoreProvider: FunctionComponent = ({ children }) => {
  const [state, setState] = useState<State>(() => initialState);

  return <Context.Provider value={[state, setState]}>{children}</Context.Provider>;
};

export default StoreProvider;

export function useStore() {
  const context = useContext(Context);

  if (!context) throw new Error(`Store:: store context not created or used outside of the StoreProvider`);

  return context;
}

export function getSettings() {
  return settings as Settings;
}

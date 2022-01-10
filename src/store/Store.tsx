import { createContext, FunctionComponent, useContext, useState } from 'react';
import initialState from './initialState.json';
import defaultSettings from './settings.json';
import { Settings, State, StateContext } from './Types';
import localization from '../localization/se.json';

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
  const localizedSettings = localization.settings;

  return { ...defaultSettings, ...localizedSettings } as Settings;
}

export function getLanguage() {
  return localization.language;
}

const { locales, options } = getSettings().currencyFormat;
const currencyFormatter = new Intl.NumberFormat(locales, options);

export function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

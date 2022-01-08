import { createContext, useState, FunctionComponent, useContext } from 'react';
import initialState from './initialState.json';

interface State {
  firstName: string | null;
  lastName: string | null;
  eMail: string | null;
  phoneNumber: string | null;
  addressFrom: string | null;
  addressTo: string | null;
  floorSpace: number;
  secondarySpace: number;
  bulkyItems: string | null;
  numberOfBulkyItems: number;
  requirePackagingHelp: boolean;
}

type StateContext = [State, React.Dispatch<React.SetStateAction<State>>];

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

import { AutocompleteProps, useJsApiLoader } from '@react-google-maps/api';
import { AddressField } from '../components/AddressSection';

export type AddressFieldTypes = {
  [key in AddressField]?: string;
};

export type RateResponse = {
  readonly rate: number;
};

export interface State extends AddressFieldTypes {
  firstName?: string;
  lastName?: string;
  eMail?: string;
  phoneNumber?: string;
  floorSpace?: number;
  secondarySpace?: number;
  bulkyItems?: string;
  numberOfBulkyItems?: number;
  requirePackagingHelp?: boolean;
  routeDistance?: number;
  rate?:number;
}

export interface ValidatedState extends Required<Omit<State, 'bulkyItems'>> {}

export type StateContext = [State, React.Dispatch<React.SetStateAction<State>>];

export interface Settings {
  autocomplete: AutocompleteProps;
  jsApiLoader: Parameters<typeof useJsApiLoader>[0];
  directionRouteOptions: Omit<google.maps.DirectionsRequest, 'origin' | 'destination'>;
  onAddressChangeDebouncedDelay: number;
}

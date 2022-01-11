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
  email?: string;
  phoneNumber?: string;
  floorSpace?: number;
  secondarySpace?: number;
  bulkyItems?: string;
  numberOfBulkyItems?: number;
  requirePackagingHelp?: boolean;
  distance?: number;
  distanceText?: string;
  rate?: string;
  id?: number;
}

export interface TestResult {
  readonly prop: string;
  readonly valid: boolean;
}
export interface ValidationResult {
  readonly isValid: boolean;
  readonly testResults: TestResult[];
}

export interface ValidatedState extends Required<Omit<State, 'bulkyItems'>> {}

export type StateContext = [State, React.Dispatch<React.SetStateAction<State>>];

interface CurrencyFormatConfig {
  readonly locales: Parameters<typeof Intl.NumberFormat>[0];
  readonly options: Parameters<typeof Intl.NumberFormat>[1];
}

interface OptionalStateProperties {
  readonly secondarySpace: number;
  readonly bulkyItems: string;
  readonly numberOfBulkyItems: number;
}
export interface Settings {
  readonly autocomplete: Omit<AutocompleteProps, 'children'>;
  readonly jsApiLoader: Omit<Parameters<typeof useJsApiLoader>[0], 'googleMapsApiKey'>;
  readonly directionRouteOptions: Omit<google.maps.DirectionsRequest, 'origin' | 'destination'>;
  readonly onAddressChangeDebouncedDelay: number;
  readonly currencyFormat: CurrencyFormatConfig;
  readonly optionalStateProperties: OptionalStateProperties;
}

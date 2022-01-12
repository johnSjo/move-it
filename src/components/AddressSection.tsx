import { useJsApiLoader } from '@react-google-maps/api';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import AddressInput from '../elements/AddressInput';
import InputWarning from '../elements/InputWarning';
import { getSettings, useStore } from '../store/Store';
import { State } from '../store/Types';
import { getText, LanguageResourceIds } from '../utils/Text';

export enum AddressField {
  FROM = 'addressFrom',
  TO = 'addressTo',
}

export interface OnAddressChangeHandlerConfig {
  [key: string]: string;
}

const AddressSection = () => {
  const [state, setState] = useStore();
  const [distance, setDistance] = useState<string | null>(null);
  const [routeWarning, setRouteWarning] = useState(false);
  const [findingRoute, setFindingRoute] = useState(false);
  const { jsApiLoader, directionRouteOptions, onAddressChangeDebouncedDelay } = getSettings();
  const { isLoaded } = useJsApiLoader({
    ...jsApiLoader,
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY!,
  });

  // NOTE: This whole address request/update have some flaws in it, it doesn't manage multiple requests properly
  // Will revisit this later if I have the time
  const onAddressChange = async ({ addressFrom, addressTo }: State) => {
    if (!addressFrom || !addressTo) return;
    const directionsService = new google.maps.DirectionsService();

    await directionsService
      .route(
        {
          ...directionRouteOptions,
          origin: addressFrom,
          destination: addressTo,
        },
        (result, status) => {
          if (status !== google.maps.DirectionsStatus.OK || !result) {
            setRouteWarning(true);
            setState((prevState) => ({ ...prevState, distance: undefined, findingRoute: false }));
            return;
          }

          const { distance, start_address, end_address } = result.routes[0].legs[0];

          // TODO: move these warnings to ui
          if (start_address !== addressFrom) {
            console.warn(
              `Address from: ${addressFrom} is not the same as the start address google picked: ${start_address}`
            );
          }

          if (end_address !== addressTo) {
            console.warn(`Address to: ${addressTo} is not the same as the end address google picked: ${end_address}`);
          }

          setDistance(distance!.text);
          setRouteWarning(false);
          setState((prevState) => ({
            ...prevState,
            distance: distance?.value,
            distanceText: distance!.text,
            startAddress: start_address,
            endAddress: end_address,
            findingRoute: false,
          }));
        }
      )
      .catch(() => setRouteWarning(true));

    setFindingRoute(false);
  };
  const debouncedOnAddressChange = useCallback(debounce(onAddressChange, onAddressChangeDebouncedDelay), []);
  const onAddressChangeHandler = (newAddress: OnAddressChangeHandlerConfig) => {
    const newState = { ...state, ...newAddress };

    if (newState.addressFrom === state.addressFrom && newState.addressTo === state.addressTo) {
      return;
    }

    setDistance(null);
    setRouteWarning(false);

    if (newState.addressFrom && newState.addressTo) setFindingRoute(true);

    setState((prevState) => ({ ...prevState, ...newAddress, findingRoute: true }));
    debouncedOnAddressChange(newState);
  };

  if (!isLoaded) return <div>{getText(LanguageResourceIds.WAITING_FOR_GOOGLE_API)}</div>;

  return (
    <div className={'form-section'}>
      <AddressInput
        id={AddressField.FROM}
        labelId={LanguageResourceIds.ADDRESS_FROM}
        placeholderId={LanguageResourceIds.ADDRESS_PLACEHOLDER}
        onAddressChange={onAddressChangeHandler}
      ></AddressInput>

      <AddressInput
        id={AddressField.TO}
        labelId={LanguageResourceIds.ADDRESS_TO}
        placeholderId={LanguageResourceIds.ADDRESS_PLACEHOLDER}
        onAddressChange={onAddressChangeHandler}
      ></AddressInput>

      <span>{distance}</span>
      <InputWarning show={routeWarning} id={LanguageResourceIds.ROUTE_NOT_FOUND} />
      {findingRoute ? (
        <svg className='spinner' role='alert' aria-live='assertive'>
          <circle cx='30' cy='30' r='20' className='circle' />
        </svg>
      ) : (
        ''
      )}
    </div>
  );
};

export default AddressSection;

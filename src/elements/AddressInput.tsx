import { Autocomplete } from '@react-google-maps/api';
import { ChangeEvent, useEffect, useState } from 'react';
import { AddressField, OnAddressChangeHandlerConfig } from '../components/AddressSection';
import { getSettings, useStore } from '../store/Store';
import { getText, LanguageResourceIds } from '../utils/Text';
import InputWarning from './InputWarning';

interface AddressInputConfig {
  readonly id: AddressField;
  readonly labelId: LanguageResourceIds;
  readonly placeholderId: LanguageResourceIds;
  readonly onAddressChange: (config: OnAddressChangeHandlerConfig) => void;
}

const AddressInput = ({ id, labelId, onAddressChange, placeholderId }: AddressInputConfig) => {
  const [state, setState] = useStore();
  const [invalidAddress, setInvalidAddress] = useState(false);
  const { options: autocompleteOptions, restrictions: autocompleteRestrictions } = getSettings().autocomplete;

  const onAddressInputChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    onAddressChange({ [id]: value });
    setInvalidAddress(false);
  };

  const onAddressInputPlaceChanged = () => {
    const input = document.getElementById(id) as HTMLInputElement;
    onAddressChange({ [id]: input.value });
    setInvalidAddress(false);
  };

  const onAddressBlur = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    onAddressChange({ [id]: value });
  };

  useEffect(() => {
    setInvalidAddress(state.invalidProps.includes(id));
  }, [state.invalidProps]);

  return (
    <div className='input-section'>
      <label>{getText(labelId)}</label>
      <Autocomplete
        className='autocomplete'
        options={autocompleteOptions}
        restrictions={autocompleteRestrictions}
        onPlaceChanged={onAddressInputPlaceChanged}
      >
        <input
          className='text-input'
          id={id}
          type='text'
          placeholder={getText(placeholderId)}
          value={state[id] ?? ''}
          onChange={onAddressInputChange}
          onBlur={onAddressBlur}
        ></input>
      </Autocomplete>
      <InputWarning show={invalidAddress} id={LanguageResourceIds.INVALID_ADDRESS} />
    </div>
  );
};

export default AddressInput;

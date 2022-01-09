import { Autocomplete } from '@react-google-maps/api';
import { ChangeEvent } from 'react';
import { AddressField } from '../components/AddressSection';
import { getSettings, useStore } from '../store/Store';
import { State } from '../store/Types';
import { getText, LanguageResourceIds } from '../utils/Text';

interface AddressInputConfig {
  readonly id: AddressField;
  readonly labelId: LanguageResourceIds;
  readonly placeholderId: LanguageResourceIds;
  readonly onAddressChange: (state: State) => void;
}

const AddressInput = ({ id, labelId, placeholderId, onAddressChange }: AddressInputConfig) => {
  const [state, setState] = useStore();
  const { options: autocompleteOptions, restrictions: autocompleteRestrictions } = getSettings().autocomplete;

  const onAddressFromChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
    setState((prevState) => {
      const newState = { ...prevState, [id]: value };
      onAddressChange(newState);

      return newState;
    });

  const onAddressFromPlaceChanged = () => {
    const input = document.getElementById(id) as HTMLInputElement;
    setState((prevState) => {
      const newState = { ...prevState, [id]: input.value };
      onAddressChange(newState);

      return newState;
    });
  };

  return (
    <div>
      <label>{getText(labelId)}</label>
      <Autocomplete
        options={autocompleteOptions}
        restrictions={autocompleteRestrictions}
        onPlaceChanged={onAddressFromPlaceChanged}
      >
        <input
          id={id}
          type='text'
          placeholder={getText(placeholderId)}
          value={state[id] ?? ''}
          onChange={onAddressFromChange}
        ></input>
      </Autocomplete>
    </div>
  );
};

export default AddressInput;

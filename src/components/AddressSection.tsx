import { ChangeEvent } from 'react';
import { useStore } from '../store/Store';
import { getText, LanguageResourceIds } from '../utils/Text';

const AddressSection = () => {
  const [{ addressFrom, addressTo }, setState] = useStore();

  const onAddressFromChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
    setState((prevState) => ({ ...prevState, addressFrom: value }));
  const onAddressToChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
    setState((prevState) => ({ ...prevState, addressTo: value }));

  return (
    <div>
      <label>{getText(LanguageResourceIds.ADDRESS_FROM)}</label>
      <input
        type='text'
        placeholder={getText(LanguageResourceIds.ADDRESS_PLACEHOLDER)}
        value={addressFrom ?? ''}
        onChange={onAddressFromChange}
      ></input>
      <label>{getText(LanguageResourceIds.ADDRESS_TO)}</label>
      <input
        type='text'
        placeholder={getText(LanguageResourceIds.ADDRESS_PLACEHOLDER)}
        value={addressTo ?? ''}
        onChange={onAddressToChange}
      ></input>
    </div>
  );
};

export default AddressSection;

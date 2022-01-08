import { getText, LanguageResourceIds } from '../utils/Text';

const AddressSection = () => {
  return (
    <div>
      <label>{getText(LanguageResourceIds.ADDRESS_FROM)}</label>
      <input type='text' placeholder={getText(LanguageResourceIds.ADDRESS_PLACEHOLDER)}></input>
      <label>{getText(LanguageResourceIds.ADDRESS_TO)}</label>
      <input type='text' placeholder={getText(LanguageResourceIds.ADDRESS_PLACEHOLDER)}></input>
    </div>
  );
};

export default AddressSection;

import { useStore } from '../store/Store';
import { getText, LanguageResourceIds } from '../utils/Text';

const AddressSummary = () => {
  const [{ addressFrom, addressTo }] = useStore();
  return (
    <div>
      <label>{getText(LanguageResourceIds.ADDRESS_FROM)}</label>
      <div>{addressFrom ?? ''}</div>
      <label>{getText(LanguageResourceIds.ADDRESS_TO)}</label>
      <div>{addressTo ?? ''}</div>
    </div>
  );
};

export default AddressSummary;

import { useStore } from '../store/Store';
import { getText, LanguageResourceIds } from '../utils/Text';

const AddressSummary = () => {
  const [{ startAddress, endAddress }] = useStore();
  return (
    <div>
      <label>{getText(LanguageResourceIds.ADDRESS_FROM)}</label>
      <div>{startAddress ?? ''}</div>
      <label>{getText(LanguageResourceIds.ADDRESS_TO)}</label>
      <div>{endAddress ?? ''}</div>
    </div>
  );
};

export default AddressSummary;

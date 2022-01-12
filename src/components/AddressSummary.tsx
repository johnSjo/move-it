import { useStore } from '../store/Store';
import { getText, LanguageResourceIds } from '../utils/Text';

const AddressSummary = () => {
  const [{ startAddress, endAddress }] = useStore();
  return (
    <div className='form-section'>
      <div className='input-section'>
        <label>{getText(LanguageResourceIds.ADDRESS_FROM)}</label>
        <div className='text-summary'>{startAddress ?? ''}</div>
      </div>

      <div className='input-section'>
        <label>{getText(LanguageResourceIds.ADDRESS_TO)}</label>
        <div className='text-summary'>{endAddress ?? ''}</div>
      </div>
    </div>
  );
};

export default AddressSummary;

import { useStore } from '../store/Store';
import { getText, LanguageResourceIds } from '../utils/Text';
import { RequirePackaging } from './SpecificationSection';

const SpecificationSummary = () => {
  const [{ floorSpace, secondarySpace, bulkyItems, requirePackagingHelp = false }] = useStore();

  return (
    <div className='form-section'>
      <div className='input-section'>
        <label>{getText(LanguageResourceIds.SPECIFICATION_FLOOR_SPACE_IN_SQ_METER)}</label>
        <div className='text-summary'>
          {floorSpace ?? ''} {getText(LanguageResourceIds.SQM)}
        </div>
      </div>

      <div className='input-section'>
        <label>{getText(LanguageResourceIds.SPECIFICATION_SECONDARY_SPACE_IN_SQ_METER)}</label>
        <div className='text-summary'>
          {secondarySpace ?? ''} {getText(LanguageResourceIds.SQM)}
        </div>
      </div>

      <div className='input-section'>
        <label>{getText(LanguageResourceIds.SPECIFICATION_BULKY_ITEMS)}</label>
        <div className='text-summary'>{bulkyItems ?? ''}</div>
      </div>

      <div className='input-section'>
        <label>{getText(LanguageResourceIds.SPECIFICATION_REQUIRE_PACKAGING_HELP)}</label>
        <div className='require-packaging'>
          <div className='radio'>
            <span>{getText(LanguageResourceIds.YES)}</span>
            <input
              type='radio'
              name='require-packaging'
              value={RequirePackaging.YES}
              checked={requirePackagingHelp}
              onChange={() => {}}
            ></input>
          </div>

          <div className='radio'>
            <span>{getText(LanguageResourceIds.NO)}</span>
            <input
              type='radio'
              name='require-packaging'
              value={RequirePackaging.NO}
              checked={!requirePackagingHelp}
              onChange={() => {}}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificationSummary;

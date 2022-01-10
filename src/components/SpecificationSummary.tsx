import { useStore } from '../store/Store';
import { getText, LanguageResourceIds } from '../utils/Text';
import { RequirePackaging } from './SpecificationSection';

const SpecificationSummary = () => {
  const [{ floorSpace, secondarySpace, bulkyItems, requirePackagingHelp = false }] = useStore();

  return (
    <div>
      <label>{getText(LanguageResourceIds.SPECIFICATION_FLOOR_SPACE_IN_SQ_METER)}</label>
      <div>
        {floorSpace ?? ''} {getText(LanguageResourceIds.SQM)}
      </div>
      <label>{getText(LanguageResourceIds.SPECIFICATION_SECONDARY_SPACE_IN_SQ_METER)}</label>
      <div>
        {secondarySpace ?? ''} {getText(LanguageResourceIds.SQM)}
      </div>
      <label>{getText(LanguageResourceIds.SPECIFICATION_BULKY_ITEMS)}</label>
      <div>{bulkyItems ?? ''}</div>
      <label>{getText(LanguageResourceIds.SPECIFICATION_REQUIRE_PACKAGING_HELP)}</label>
      <div>
        <span>{getText(LanguageResourceIds.YES)}</span>
        <input
          type='radio'
          name='require-packaging'
          value={RequirePackaging.YES}
          checked={requirePackagingHelp}
          onChange={() => {}}
        ></input>
      </div>
      <div>
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
  );
};

export default SpecificationSummary;

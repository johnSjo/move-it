import { ChangeEvent, useState } from 'react';
import { getText, LanguageResourceIds } from '../utils/Text';

const enum RequirePackaging {
  YES = 'yes',
  NO = 'no',
}

const SpecificationSection = () => {
  const [selectedRadio, setSelectedRadio] = useState<string>(() => RequirePackaging.NO);
  const isRadioSelected = (value: RequirePackaging) => selectedRadio === value;
  const handleRadioChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => setSelectedRadio(value);

  return (
    <div>
      <label>{getText(LanguageResourceIds.SPECIFICATION_FLOOR_SPACE_IN_SQ_METER)}</label>
      <input type='text' onChange={() => '45'}></input>
      <label>{getText(LanguageResourceIds.SPECIFICATION_SECONDARY_SPACE_IN_SQ_METER)}</label>
      <input type='text'></input>
      <label>{getText(LanguageResourceIds.SPECIFICATION_NUMBER_OF_BULKY_ITEMS)}</label>
      <input type='number'></input>
      <label>{getText(LanguageResourceIds.SPECIFICATION_REQUIRE_PACKAGING_HELP)}</label>
      <input
        type='radio'
        name='require-packaging'
        value={RequirePackaging.YES}
        checked={isRadioSelected(RequirePackaging.YES)}
        onChange={handleRadioChange}
      ></input>
      <input
        type='radio'
        name='require-packaging'
        value={RequirePackaging.NO}
        checked={isRadioSelected(RequirePackaging.NO)}
        onChange={handleRadioChange}
      ></input>
    </div>
  );
};

export default SpecificationSection;

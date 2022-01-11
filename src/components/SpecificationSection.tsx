import { ChangeEvent, useEffect, useState } from 'react';
import InputWarning from '../elements/InputWarning';
import { useStore } from '../store/Store';
import { getText, LanguageResourceIds } from '../utils/Text';
import { countWords, removeLeadingZeros } from '../utils/Validation';

export const enum RequirePackaging {
  YES = 'yes',
  NO = 'no',
}

const SpecificationSection = () => {
  const [
    { floorSpace, secondarySpace, bulkyItems, numberOfBulkyItems, requirePackagingHelp = false, invalidProps },
    setState,
  ] = useStore();
  const [invalidFloorSpace, setInvalidFloorSpace] = useState(false);

  const onFloorSpaceChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    let floorSpace = value === '' ? 0 : parseInt(value, 10);
    if (isNaN(floorSpace)) {
      throw new Error(`floorSpace value (${value}) is not a valid number`);
    }

    setInvalidFloorSpace(false);

    if (floorSpace < 1) {
      floorSpace = 1;
      setInvalidFloorSpace(true);
    }

    setState((prevState) => ({ ...prevState, floorSpace }));
  };

  const onSecondarySpaceChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    let secondarySpace = Math.max(value === '' ? 0 : parseInt(value, 10), 0);
    if (isNaN(secondarySpace)) {
      throw new Error(`secondarySpace value (${value}) is not a valid number`);
    }

    setState((prevState) => ({ ...prevState, secondarySpace }));
  };

  const handleRadioChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
    setState((prevState) => ({
      ...prevState,
      requirePackagingHelp: value === RequirePackaging.YES,
    }));

  const onBulkyItemsChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
    setState((prevState) => ({
      ...prevState,
      numberOfBulkyItems: countWords(value),
      bulkyItems: value,
    }));

  useEffect(() => {
    setInvalidFloorSpace(invalidProps.includes('floorSpace'));
  }, [invalidProps]);

  return (
    <div>
      <label>{getText(LanguageResourceIds.SPECIFICATION_FLOOR_SPACE_IN_SQ_METER)}</label>
      <input
        type='number'
        value={floorSpace !== undefined ? removeLeadingZeros(floorSpace) : ''}
        onChange={onFloorSpaceChange}
      ></input>
      <InputWarning show={invalidFloorSpace} id={LanguageResourceIds.INVALID_FLOOR_SPACE} />

      <label>{getText(LanguageResourceIds.SPECIFICATION_SECONDARY_SPACE_IN_SQ_METER)}</label>
      <input
        type='number'
        value={secondarySpace !== undefined ? removeLeadingZeros(secondarySpace) : ''}
        onChange={onSecondarySpaceChange}
      ></input>

      <label>{getText(LanguageResourceIds.SPECIFICATION_BULKY_ITEMS)}</label>
      <input type='text' value={bulkyItems ?? ''} onChange={onBulkyItemsChange}></input>
      <span>{numberOfBulkyItems !== undefined && numberOfBulkyItems > 0 ? numberOfBulkyItems : ''}</span>

      <label>{getText(LanguageResourceIds.SPECIFICATION_REQUIRE_PACKAGING_HELP)}</label>
      <div>
        <span>{getText(LanguageResourceIds.YES)}</span>
        <input
          type='radio'
          name='require-packaging'
          value={RequirePackaging.YES}
          checked={requirePackagingHelp}
          onChange={handleRadioChange}
        ></input>
      </div>
      <div>
        <span>{getText(LanguageResourceIds.NO)}</span>
        <input
          type='radio'
          name='require-packaging'
          value={RequirePackaging.NO}
          checked={!requirePackagingHelp}
          onChange={handleRadioChange}
        ></input>
      </div>
    </div>
  );
};

export default SpecificationSection;

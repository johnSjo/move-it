import { ChangeEvent, useState } from 'react';
import { useStore } from '../store/Store';
import { getText, LanguageResourceIds } from '../utils/Text';
import { countWords, removeLeadingZeros } from '../utils/Validation';

const enum RequirePackaging {
  YES = 'yes',
  NO = 'no',
}

const SpecificationSection = () => {
  const [{ floorSpace, secondarySpace, bulkyItems, numberOfBulkyItems, requirePackagingHelp }, setState] = useStore();
  const [showTooSmallFloorSpaceWarn, setShowTooSmallFloorSpaceWarn] = useState(false);

  const onFloorSpaceChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    let floorSpace = value === '' ? 0 : parseInt(value, 10);
    if (isNaN(floorSpace)) {
      throw new Error(`floorSpace value (${value}) is not a valid number`);
    }

    setShowTooSmallFloorSpaceWarn(false);

    if (floorSpace <= 0) {
      floorSpace = 0;
      setShowTooSmallFloorSpaceWarn(true);
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

  const isRadioSelected = (value: boolean) => requirePackagingHelp === value;
  const handleRadioChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
    setState((prevState) => ({ ...prevState, requirePackagingHelp: value === RequirePackaging.YES }));

  const onBulkyItemsChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
    setState((prevState) => ({ ...prevState, numberOfBulkyItems: countWords(value), bulkyItems: value }));

  return (
    <div>
      <label>{getText(LanguageResourceIds.SPECIFICATION_FLOOR_SPACE_IN_SQ_METER)}</label>
      <input
        type='number'
        value={floorSpace !== undefined ? removeLeadingZeros(floorSpace) : ''}
        onChange={onFloorSpaceChange}
      ></input>
      {showTooSmallFloorSpaceWarn ? (
        <span>{getText(LanguageResourceIds.SPECIFICATION_FLOOR_SPACE_TOO_SMALL_WARN)}</span>
      ) : (
        ''
      )}
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
      <input
        type='radio'
        name='require-packaging'
        value={RequirePackaging.YES}
        checked={isRadioSelected(true)}
        onChange={handleRadioChange}
      ></input>
      <input
        type='radio'
        name='require-packaging'
        value={RequirePackaging.NO}
        checked={isRadioSelected(false)}
        onChange={handleRadioChange}
      ></input>
    </div>
  );
};

export default SpecificationSection;

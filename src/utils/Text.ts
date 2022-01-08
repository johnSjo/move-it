import language from '../language/se.json';

export enum LanguageResourceIds {
  FORM_TITLE = 'formTitle',
  CONTACTS = 'contacts',
  ADDRESS = 'address',
  MOVE_SPECIFICATIONS = 'moveSpecifications',
  CONTACT_FIRST_NAME = 'contactFirstName',
  CONTACT_LAST_NAME = 'contactLastName',
  CONTACT_EMAIL = 'contactEMail',
  CONTACT_PHONE_NUMBER = 'contactPhoneNumber',
  ADDRESS_FROM = 'addressFrom',
  ADDRESS_TO = 'addressTo',
  ADDRESS_PLACEHOLDER = 'addressPlaceholder',
  SPECIFICATION_FLOOR_SPACE_IN_SQ_METER = 'specificationFloorSpaceInSqMeter',
  SPECIFICATION_SECONDARY_SPACE_IN_SQ_METER = 'specificationSecondarySpaceInSqMeter',
  SPECIFICATION_NUMBER_OF_BULKY_ITEMS = 'specificationNumberOfBulkyItems',
  SPECIFICATION_REQUIRE_PACKAGING_HELP = 'specificationRequirePackagingHelp',
  YES = 'yes',
  NO = 'no',
  FORM_SUBMIT = 'formSubmit',
}

export function getText(id: LanguageResourceIds) {
  if (language[id] === undefined) {
    console.warn(`getText:: id${id} does not exist`);

    return '';
  }

  return language[id];
}

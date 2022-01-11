import { getLanguage } from '../store/Store';

export enum LanguageResourceIds {
  FORM_TITLE = 'formTitle',
  OFFER_TITLE = 'offerTitle',
  CONTACTS = 'contacts',
  ADDRESS = 'address',
  MOVE_SPECIFICATIONS = 'moveSpecifications',
  CONTACT_FIRST_NAME = 'contactFirstName',
  INVALID_FIST_NAME = 'invalidFirstName',
  CONTACT_LAST_NAME = 'contactLastName',
  INVALID_LAST_NAME = 'invalidLastName',
  CONTACT_EMAIL = 'contactEmail',
  INVALID_EMAIL = 'invalidEmail',
  CONTACT_PHONE_NUMBER = 'contactPhoneNumber',
  INVALID_PHONE_NUMBER = 'invalidPhoneNumber',
  CONTACT_PHONE_NUMBER_WARN = 'contactPhoneNumberWarn',
  ADDRESS_FROM = 'addressFrom',
  ADDRESS_TO = 'addressTo',
  INVALID_ADDRESS = 'invalidAddress',
  ADDRESS_PLACEHOLDER = 'addressPlaceholder',
  SPECIFICATION_FLOOR_SPACE_IN_SQ_METER = 'specificationFloorSpaceInSqMeter',
  INVALID_FLOOR_SPACE = 'invalidFloorSpace',
  SPECIFICATION_SECONDARY_SPACE_IN_SQ_METER = 'specificationSecondarySpaceInSqMeter',
  SPECIFICATION_BULKY_ITEMS = 'specificationBulkyItems',
  SPECIFICATION_REQUIRE_PACKAGING_HELP = 'specificationRequirePackagingHelp',
  YES = 'yes',
  NO = 'no',
  FORM_SUBMIT = 'formSubmit',
  WAITING_FOR_GOOGLE_API = 'waitingForGoogleAPI',
  ROUTE_NOT_FOUND = 'routeNotFound',
  PRICE_INFORMATION = 'priceInformation',
  PRICE_ESTIMATION = 'priceEstimation',
  INC_VAT = 'incVat',
  TOTAL_DISTANCE = 'totalDistance',
  OFFER_AVAILABLE_90_DAYS = 'offerAvailable90Days',
  QUESTIONS_CONTACT = 'questionsContact',
  MOVE_IT_EMAIL = 'moveItEmail',
  REOPEN_OFFER = 'reopenOffer',
  APPROVE_OFFER = 'approveOffer',
  SQM = 'sqm',
  CHANGE_DATA = 'changeData',
}

export function getText(id: LanguageResourceIds) {
  const language = getLanguage();

  if (language[id] === undefined) {
    console.warn(`getText:: id${id} does not exist`);

    return '';
  }

  return language[id];
}

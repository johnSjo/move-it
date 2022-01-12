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
  DISTANCE_RESULT = 'distanceResult',
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
  TOTAL_DISTANCE = 'totalDistance',
  OFFER_AVAILABLE_90_DAYS = 'offerAvailable90Days',
  QUESTIONS_CONTACT = 'questionsContact',
  MOVE_IT_EMAIL = 'moveItEmail',
  REOPEN_OFFER = 'reopenOffer',
  APPROVE_OFFER = 'approveOffer',
  SQM = 'sqm',
  CHANGE_DATA = 'changeData',
  ESTIMATING_PRICE = 'estimatingPrice',
}

export function getText(id: LanguageResourceIds, replacements?: string[], placeholder?: string) {
  const language = getLanguage();

  if (language[id] === undefined) {
    console.warn(`getText:: id${id} does not exist`);

    return '';
  }

  return replacements && replacements.length > 0
    ? replacePlaceHolders({ text: language[id], replacements, placeholder })
    : language[id];
}

interface ReplacePlaceHoldersConfig {
  readonly text: string;
  readonly replacements: string[];
  readonly placeholder?: string;
}

function replacePlaceHolders({ text, replacements, placeholder = '%s' }: ReplacePlaceHoldersConfig) {
  return replacements.reduce((updatedText, replacement) => updatedText.replace(placeholder, replacement), text);
}

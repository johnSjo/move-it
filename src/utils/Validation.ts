import { State, ValidatedState } from '../store/Types';

export function removeLeadingZeros(value: number) {
  const string = value.toString();
  if (string.length < 2) {
    return string;
  }
  return string.replace(/^0+/, '');
}

export function countWords(str: string) {
  if (str === '') return 0;

  return (
    str
      // start/end spaces
      .replace(/(^\s*)|(\s*$)/gi, '')
      // multi-spaces to singles
      .replace(/[ ]{2,}/gi, ' ')
      // exclude new line
      .replace(/\n /, '\n')
      .split(' ').length
  );
}

interface Schema {
  [key: string]: (value: any) => boolean;
}

const stateSchema: Schema = {
  firstName: (value: string) => value.length > 0,
  lastName: (value: string) => value.length > 0,
  email: (value: string) => validateEmail(value),
  phoneNumber: (value: string) => value.length > 0,
  addressFrom: (value: string) => value.length > 0,
  addressTo: (value: string) => value.length > 0,
  floorSpace: (value: number) => value > 0,
  requirePackagingHelp: (value: boolean) => typeof value === 'boolean',
  distance: (value: number) => value > 0,
  distanceText: (value: string) => value.length > 0,
};

const optionalStateProperties = {
  secondarySpace: 0,
  bulkyItems: '',
  numberOfBulkyItems: 0,
};

export function createValidatedState(state: State): ValidatedState | undefined {
  const isValidState = validateState(state);

  if (isValidState) {
    return { ...optionalStateProperties, ...state } as ValidatedState;
  }

  return undefined;
}

function validateState(state: State) {
  return validate({ object: state, schema: stateSchema });
}

interface ValidateConfig {
  readonly object: { [key: string]: any };
  readonly schema: Schema;
}

function validate({ object, schema }: ValidateConfig) {
  const results = Object.entries(schema).reduce((results: boolean[], [key, test]) => {
    const prop = object[key];
    return [...results, prop !== undefined ? test(prop) : false];
  }, []);

  if (results.some((result) => !result)) {
    results.forEach((result, index) =>
      console.log(
        !result
          ? `Property ${Object.keys(schema)[index]} did NOT pass validation`
          : `-- Property ${Object.keys(schema)[index]} passed validation`
      )
    );
    return false;
  }

  console.log('info is valid');
  return true;
}

export function validateEmail(value?: string) {
  return (
    value !== undefined &&
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(
      value
    )
  );
}

// NOTE: this will only be used to give the user a hit that their number might be wrong
// full validation need to happen server-side
export function validatePhoneNumberLoosely(value?: string) {
  return value !== undefined && /^[ 0-9\.\(\)\+\-]*$/.test(value) && value.length > 6;
}

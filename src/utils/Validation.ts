import { State, TestResult, ValidatedState, ValidationResult } from '../store/Types';

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
  [key: string]: (value?: any) => boolean;
}

const stateSchema: Schema = {
  firstName: (value?: string) => value !== undefined && value.length > 0,
  lastName: (value?: string) => value !== undefined && value.length > 0,
  email: (value?: string) => value !== undefined && validateEmail(value),
  phoneNumber: (value?: string) => value !== undefined && value.length > 0,
  addressFrom: (value?: string) => value !== undefined && value.length > 0,
  addressTo: (value?: string) => value !== undefined && value.length > 0,
  floorSpace: (value?: number) => value !== undefined && value > 0,
  requirePackagingHelp: (value?: boolean) => value !== undefined,
  distance: (value?: number) => value !== undefined && value > 0,
  distanceText: (value?: string) => value !== undefined && value.length > 0,

  secondarySpace: (value?: number) => value === undefined || value > -1,
  bulkyItems: (value?: string) => value === undefined || value.length > 0,
  numberOfBulkyItems: (value?: number) => value === undefined || value > -1,
};

export function validateState(state: State) {
  return validate({ object: state, schema: stateSchema });
}

interface ValidateConfig {
  readonly object: { [key: string]: any };
  readonly schema: Schema;
}

function validate({ object, schema }: ValidateConfig): ValidationResult {
  const results = Object.entries(schema).reduce((results: TestResult[], [key, test]) => {
    const prop = object[key];
    const testResult = test(prop);

    return [...results, { prop: key, valid: testResult }];
  }, []);
  const isValid = results.every(({ valid }) => valid);

  if (!isValid) {
    results.forEach(({ prop, valid }) =>
      console.log(valid ? `-- Property ${prop} passed validation` : `Property ${prop} did NOT pass validation`)
    );
  }

  return { isValid, testResults: results };
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

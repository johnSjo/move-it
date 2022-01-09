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
  firstName: (value: string) => typeof value === 'string' && value.length > 0,
  lastName: (value: string) => typeof value === 'string' && value.length > 0,
  eMail: (value: string) => true, // TODO: do e-mail validation
  phoneNumber: (value: string) => typeof value === 'string' && value.length > 0,
  addressFrom: (value: string) => typeof value === 'string' && value.length > 0,
  addressTo: (value: string) => typeof value === 'string' && value.length > 0,
  floorSpace: (value: number) => typeof value === 'number' && value > 0,

  secondarySpace: (value: number) => typeof value === 'number' || value === undefined,
  bulkyItems: (value: string) => typeof value === 'string' || value === undefined,
  numberOfBulkyItems: (value: number) =>
    (typeof value === 'number' && Number.isInteger(value) && Number.isFinite(value)) || value === undefined,

  requirePackagingHelp: (value: boolean) => typeof value === 'boolean',
  routeDistance: (value: number) => typeof value === 'number' && value > 0,
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
    return [...results, test(prop)];
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

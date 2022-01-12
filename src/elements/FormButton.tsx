import { SyntheticEvent } from 'react';
import { getText, LanguageResourceIds } from '../utils/Text';

interface FormButtonConfig {
  readonly onSubmitHandler: (event: SyntheticEvent) => Promise<void>;
}

const FormButton = ({ onSubmitHandler }: FormButtonConfig) => {
  return (
    <input
      className='submit-button'
      type='button'
      value={getText(LanguageResourceIds.FORM_SUBMIT)}
      onClick={onSubmitHandler}
    />
  );
};

export default FormButton;

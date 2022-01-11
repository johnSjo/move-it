import { SyntheticEvent } from 'react';
import { useStore } from '../store/Store';
import { getText, LanguageResourceIds } from '../utils/Text';

interface FormButtonConfig {
  readonly onSubmitHandler: (event: SyntheticEvent) => Promise<void>;
}

const FormButton = ({ onSubmitHandler }: FormButtonConfig) => {
  const [{ findingRoute }] = useStore();

  return <input type='button' value={getText(LanguageResourceIds.FORM_SUBMIT)} onClick={onSubmitHandler} />;
};

export default FormButton;

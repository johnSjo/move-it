import { getText, LanguageResourceIds } from '../utils/Text';

interface InputWarningConfig {
  readonly id: LanguageResourceIds;
  readonly show?: boolean;
  readonly loose?: boolean;
}

const InputWarning = ({ id, show = true, loose = false }: InputWarningConfig) => {
  // TODO: if loose true -> use different style
  return <>{show ? <div>{getText(id)}</div> : ''}</>;
};

export default InputWarning;

import { getText, LanguageResourceIds } from '../utils/Text';
import RedWarning from '../assets/images/warning_sign_red.svg';
import OrangeWarning from '../assets/images/warning_sign_orange.svg';

interface InputWarningConfig {
  readonly id: LanguageResourceIds;
  readonly show?: boolean;
  readonly loose?: boolean;
}

const InputWarning = ({ id, show = true, loose = false }: InputWarningConfig) => {
  return (
    <>
      {show ? (
        <div className={`warning${loose ? ' loose' : ''}`}>
          <div className='warning-icon red'>
            <img src={loose ? OrangeWarning : RedWarning} height={15} width={15} />
          </div>
          {getText(id)}
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default InputWarning;

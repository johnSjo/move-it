import { useStore } from '../store/Store';
import { getText, LanguageResourceIds } from '../utils/Text';

const ContactSummary = () => {
  const [{ firstName, lastName, email, phoneNumber }] = useStore();
  return (
    <div className='form-section'>
      <div className='input-section'>
        <label>{getText(LanguageResourceIds.CONTACT_FIRST_NAME)}</label>
        <div className='text-summary'>{firstName ?? ''}</div>
      </div>

      <div className='input-section'>
        <label>{getText(LanguageResourceIds.CONTACT_LAST_NAME)}</label>
        <div className='text-summary'>{lastName ?? ''}</div>
      </div>

      <div className='input-section'>
        <label>{getText(LanguageResourceIds.CONTACT_EMAIL)}</label>
        <div className='text-summary'>{email ?? ''}</div>
      </div>

      <div className='input-section'>
        <label>{getText(LanguageResourceIds.CONTACT_PHONE_NUMBER)}</label>
        <div className='text-summary'>{phoneNumber ?? ''}</div>
      </div>
    </div>
  );
};

export default ContactSummary;

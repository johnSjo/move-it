import { useStore } from '../store/Store';
import { getText, LanguageResourceIds } from '../utils/Text';

const ContactSummary = () => {
  const [{ firstName, lastName, eMail, phoneNumber }] = useStore();
  return (
    <div>
      <label>{getText(LanguageResourceIds.CONTACT_FIRST_NAME)}</label>
      <div>{firstName ?? ''}</div>
      <label>{getText(LanguageResourceIds.CONTACT_LAST_NAME)}</label>
      <div>{lastName ?? ''}</div>
      <label>{getText(LanguageResourceIds.CONTACT_EMAIL)}</label>
      <div>{eMail ?? ''}</div>
      <label>{getText(LanguageResourceIds.CONTACT_PHONE_NUMBER)}</label>
      <div>{phoneNumber ?? ''}</div>
    </div>
  );
};

export default ContactSummary;

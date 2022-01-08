import { ChangeEvent } from 'react';
import { useStore } from '../store/Store';
import { getText, LanguageResourceIds } from '../utils/Text';

const ContactSection = () => {
  const [{ firstName, lastName, eMail, phoneNumber }, setState] = useStore();

  const onFirstNameChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
    setState((prevState) => ({ ...prevState, firstName: value }));
  const onLastNameChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
    setState((prevState) => ({ ...prevState, lastName: value }));
  // TODO: validate e-mail
  const onEMailChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
    setState((prevState) => ({ ...prevState, eMail: value }));
  // TODO: validate phone number
  const onPhoneNumberChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
    setState((prevState) => ({ ...prevState, phoneNumber: value }));

  return (
    <div>
      <label>{getText(LanguageResourceIds.CONTACT_FIRST_NAME)}</label>
      <input
        type='text'
        placeholder={getText(LanguageResourceIds.CONTACT_FIRST_NAME)}
        value={firstName ?? ''}
        onChange={onFirstNameChange}
      ></input>
      <label>{getText(LanguageResourceIds.CONTACT_LAST_NAME)}</label>
      <input
        type='text'
        placeholder={getText(LanguageResourceIds.CONTACT_LAST_NAME)}
        value={lastName ?? ''}
        onChange={onLastNameChange}
      ></input>
      <label>{getText(LanguageResourceIds.CONTACT_EMAIL)}</label>
      <input
        type='email'
        placeholder={getText(LanguageResourceIds.CONTACT_EMAIL)}
        value={eMail ?? ''}
        onChange={onEMailChange}
      ></input>
      <label>{getText(LanguageResourceIds.CONTACT_PHONE_NUMBER)}</label>
      <input
        type='text'
        placeholder={getText(LanguageResourceIds.CONTACT_PHONE_NUMBER)}
        value={phoneNumber ?? ''}
        onChange={onPhoneNumberChange}
      ></input>
    </div>
  );
};

export default ContactSection;

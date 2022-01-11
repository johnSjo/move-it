import { ChangeEvent, useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { useStore } from '../store/Store';
import { getText, LanguageResourceIds } from '../utils/Text';
import { validateEmail, validatePhoneNumberLoosely } from '../utils/Validation';
import InputWarning from '../elements/InputWarning';

const ContactSection = () => {
  const [{ firstName, lastName, email, phoneNumber }, setState] = useStore();
  const [emailWarning, setEmailWarning] = useState(false);
  const [phoneNumberWarning, setPhoneNumberWarning] = useState(false);

  const onFirstNameChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
    setState((prevState) => ({ ...prevState, firstName: value }));
  const onLastNameChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
    setState((prevState) => ({ ...prevState, lastName: value }));
  const onEmailChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
    setState((prevState) => ({ ...prevState, email: value }));
  const onPhoneNumberChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
    setState((prevState) => ({ ...prevState, phoneNumber: value }));

  const debouncedEmailWarning = useCallback(
    debounce((value: string) => setEmailWarning(!validateEmail(value)), 1000),
    []
  );
  const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onEmailChange(event);
    setEmailWarning(false);
    debouncedEmailWarning(event.currentTarget.value);
  };

  const debouncedPhoneNumberWarning = useCallback(
    debounce((value: string) => setPhoneNumberWarning(!validatePhoneNumberLoosely(value)), 1000),
    []
  );
  const onPhoneNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onPhoneNumberChange(event);
    setPhoneNumberWarning(false);
    debouncedPhoneNumberWarning(event.currentTarget.value);
  };

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
        type='text'
        placeholder={getText(LanguageResourceIds.CONTACT_EMAIL)}
        value={email ?? ''}
        onChange={onEmailChangeHandler}
      ></input>
      <InputWarning show={emailWarning} id={LanguageResourceIds.CONTACT_EMAIL_WARN} />
      <label>{getText(LanguageResourceIds.CONTACT_PHONE_NUMBER)}</label>
      <input
        type='text'
        placeholder={getText(LanguageResourceIds.CONTACT_PHONE_NUMBER)}
        value={phoneNumber ?? ''}
        onChange={onPhoneNumberChangeHandler}
      ></input>
      <InputWarning show={phoneNumberWarning} id={LanguageResourceIds.CONTACT_PHONE_NUMBER_WARN} loose={true} />
    </div>
  );
};

export default ContactSection;

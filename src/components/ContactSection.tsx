import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useStore } from '../store/Store';
import { getText, LanguageResourceIds } from '../utils/Text';
import { validateEmail, validatePhoneNumberLoosely } from '../utils/Validation';
import InputWarning from '../elements/InputWarning';

const ContactSection = () => {
  const [{ firstName, lastName, email, phoneNumber, invalidProps }, setState] = useStore();
  const [invalidFirstName, setInvalidFirstName] = useState(false);
  const [invalidLastName, setInvalidLastName] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false);
  const [phoneNumberWarning, setPhoneNumberWarning] = useState(false);

  const onFirstNameChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInvalidFirstName(false);
    setState((prevState) => ({ ...prevState, firstName: value }));
  };
  const onLastNameChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInvalidLastName(false);
    setState((prevState) => ({ ...prevState, lastName: value }));
  };
  const onEmailChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
    setState((prevState) => ({ ...prevState, email: value }));
  const onPhoneNumberChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
    setState((prevState) => ({ ...prevState, phoneNumber: value }));

  const debouncedEmailWarning = useCallback(
    debounce((value: string) => setInvalidEmail(!validateEmail(value)), 1000),
    []
  );
  const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onEmailChange(event);
    setInvalidEmail(false);
    debouncedEmailWarning(event.currentTarget.value);
  };

  const debouncedPhoneNumberWarning = useCallback(
    debounce((value: string) => setPhoneNumberWarning(!validatePhoneNumberLoosely(value)), 1000),
    []
  );
  const onPhoneNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onPhoneNumberChange(event);
    setInvalidPhoneNumber(false);
    setPhoneNumberWarning(false);
    debouncedPhoneNumberWarning(event.currentTarget.value);
  };

  useEffect(() => {
    setInvalidFirstName(invalidProps.includes('firstName'));
    setInvalidLastName(invalidProps.includes('lastName'));
    setInvalidEmail(invalidProps.includes('email'));
    setInvalidPhoneNumber(invalidProps.includes('phoneNumber'));
  }, [invalidProps]);

  return (
    <div>
      <label>{getText(LanguageResourceIds.CONTACT_FIRST_NAME)}</label>
      <input
        type='text'
        placeholder={getText(LanguageResourceIds.CONTACT_FIRST_NAME)}
        value={firstName ?? ''}
        onChange={onFirstNameChange}
      ></input>
      <InputWarning show={invalidFirstName} id={LanguageResourceIds.INVALID_FIST_NAME} />

      <label>{getText(LanguageResourceIds.CONTACT_LAST_NAME)}</label>
      <input
        type='text'
        placeholder={getText(LanguageResourceIds.CONTACT_LAST_NAME)}
        value={lastName ?? ''}
        onChange={onLastNameChange}
      ></input>
      <InputWarning show={invalidLastName} id={LanguageResourceIds.INVALID_LAST_NAME} />

      <label>{getText(LanguageResourceIds.CONTACT_EMAIL)}</label>
      <input
        type='text'
        placeholder={getText(LanguageResourceIds.CONTACT_EMAIL)}
        value={email ?? ''}
        onChange={onEmailChangeHandler}
      ></input>
      <InputWarning show={invalidEmail} id={LanguageResourceIds.INVALID_EMAIL} />

      <label>{getText(LanguageResourceIds.CONTACT_PHONE_NUMBER)}</label>
      <input
        type='text'
        placeholder={getText(LanguageResourceIds.CONTACT_PHONE_NUMBER)}
        value={phoneNumber ?? ''}
        onChange={onPhoneNumberChangeHandler}
      ></input>
      <InputWarning show={invalidPhoneNumber} id={LanguageResourceIds.INVALID_PHONE_NUMBER} />
      <InputWarning show={phoneNumberWarning} id={LanguageResourceIds.CONTACT_PHONE_NUMBER_WARN} loose={true} />
    </div>
  );
};

export default ContactSection;

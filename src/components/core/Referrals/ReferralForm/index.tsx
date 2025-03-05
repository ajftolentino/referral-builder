import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, InputText } from 'components/core';
import { isValidEmail, validatePhoneNumber } from 'helpers';
import { useErrorMessage, usePrevious } from 'hooks';
import { Errors, Referral } from 'types';

import './styles.scss';

type Props = {
  errors?: Errors;
  referral?: Referral | null;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (referral: Referral) => void;
  reset: () => void;
};

const ReferralForm: React.FC<Props> = ({
  errors,
  referral,
  onSubmit,
  reset,
}) => {
  useErrorMessage('referrals');

  const previousReferral = usePrevious(referral);

  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const givenNameInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const surnameInputRef = useRef<HTMLInputElement | null>(null);

  const [email, setEmail] = useState(referral?.email || '');
  const [givenName, setGivenName] = useState(referral?.givenName || '');
  const [phone, setPhone] = useState(referral?.phone || '');
  const [surname, setSurname] = useState(referral?.surname || '');
  // Address
  const [building, setBuilding] = useState(referral?.address?.building || '');
  const [city, setCity] = useState(referral?.address?.city || '');
  const [country, setCountry] = useState(referral?.address?.country || '');
  const [stateOrProvince, setStateOrProvince] = useState(
    referral?.address?.stateOrProvince || ''
  );
  const [street, setStreet] = useState(referral?.address?.street || '');
  const [zipCode, setZipCode] = useState(referral?.address?.zipCode || '');
  // Errors
  const [emailErrors, setEmailErrors] = useState('');
  const [givenNameErrors, setGivenNameErrors] = useState('');
  const [phoneErrors, setPhoneErrors] = useState('');
  const [surnameErrors, setSurnameErrors] = useState('');

  useEffect(() => {
    if (referral && !previousReferral) {
      setEmail(referral.email);
      setGivenName(referral.givenName);
      setPhone(referral.phone);
      setSurname(referral.surname);
      setBuilding(referral.address?.building || '');
      setCity(referral.address?.city || '');
      setCountry(referral.address?.country || '');
      setStateOrProvince(referral.address?.stateOrProvince || '');
      setStreet(referral.address?.street || '');
      setZipCode(referral.address?.zipCode || '');
    }
  }, [previousReferral, referral]);

  const onInputEmail = useCallback(
    (value: string) => {
      if (emailErrors) {
        setEmailErrors('');
      }
      if (errors) {
        reset();
      }
      setEmail(value);
    },
    [emailErrors, errors, reset]
  );

  const onInputGivenName = useCallback(
    (value: string) => {
      if (givenNameErrors) {
        setGivenNameErrors('');
      }
      if (errors) {
        reset();
      }
      setGivenName(value);
    },
    [givenNameErrors, errors, reset]
  );

  const onInputPhone = useCallback(
    (value: string) => {
      if (phoneErrors) {
        setPhoneErrors('');
      }
      if (errors) {
        reset();
      }
      setPhone(value);
    },
    [phoneErrors, errors, reset]
  );

  const onInputSurname = useCallback(
    (value: string) => {
      if (surnameErrors) {
        setSurnameErrors('');
      }
      if (errors) {
        reset();
      }
      setSurname(value);
    },
    [surnameErrors, errors, reset]
  );

  const validateReferral = useCallback(() => {
    let valid = true;
    if (!email.trim()) {
      valid = false;
      setEmailErrors('Email is required.');
    } else if (!isValidEmail(email)) {
      valid = false;
      setEmailErrors('Invalid email address.');
    }
    if (!givenName.trim()) {
      valid = false;
      setGivenNameErrors('Given name is required.');
    }
    if (!phone.trim()) {
      valid = false;
      setPhoneErrors('Phone number is required.');
    } else if (!validatePhoneNumber(phone)) {
      valid = false;
      setPhoneErrors('Invalid phone number.');
    }
    if (!surname.trim()) {
      valid = false;
      setSurnameErrors('Surname is required');
    }
    return valid;
  }, [email, givenName, phone, surname]);

  const onButtonClick = useCallback(() => {
    if (validateReferral()) {
      onSubmit({
        address: {
          building,
          city,
          country,
          stateOrProvince,
          street,
          zipCode,
        },
        id: referral?.id,
        email,
        givenName,
        phone,
        surname,
      } as Referral);
    }
  }, [
    referral?.id,
    building,
    city,
    country,
    email,
    givenName,
    phone,
    stateOrProvince,
    street,
    surname,
    zipCode,
    onSubmit,
    validateReferral,
  ]);
  const onUploadAvatar = useCallback(() => {}, []);

  return (
    <div className="referralForm">
      <h1 className="title">Referral Builder</h1>
      <div className="column">
        <h3 className="heading">Personal Details</h3>
        <div className="row">
          <InputText
            errors={givenNameErrors}
            label="Given Name"
            maxLength={50}
            name="given_name"
            ref={givenNameInputRef}
            required
            setValue={onInputGivenName}
            type="input"
            value={givenName}
          />
          <InputText
            errors={surnameErrors}
            label="Surname"
            maxLength={50}
            name="surname"
            ref={surnameInputRef}
            required
            setValue={onInputSurname}
            type="input"
            value={surname}
          />
        </div>
        <div className="row">
          <InputText
            errors={emailErrors}
            label="Email"
            maxLength={50}
            name="email"
            ref={emailInputRef}
            required
            setValue={onInputEmail}
            type="input"
            value={email}
          />
          <InputText
            errors={phoneErrors}
            label="Phone"
            maxLength={20}
            name="phone"
            ref={phoneInputRef}
            required
            setValue={onInputPhone}
            type="input"
            value={phone}
          />
        </div>
      </div>
      <div className="column">
        <h3 className="heading">Address</h3>
        <div className="row">
          <InputText
            label="Apt/Building Name"
            maxLength={50}
            name="building"
            required={false}
            setValue={setBuilding}
            type="input"
            value={building}
          />
          <InputText
            label="Street"
            maxLength={30}
            name="street"
            required={false}
            setValue={setStreet}
            type="input"
            value={street}
          />
        </div>
        <div className="row">
          <InputText
            label="State"
            maxLength={30}
            name="state"
            required={false}
            setValue={setStateOrProvince}
            type="input"
            value={stateOrProvince}
          />
          <InputText
            label="City"
            maxLength={30}
            name="city"
            required={false}
            setValue={setCity}
            type="input"
            value={city}
          />
        </div>
        <div className="row">
          <InputText
            label="Postcode"
            maxLength={30}
            name="postcode"
            required={false}
            setValue={setZipCode}
            type="input"
            value={zipCode}
          />
          <InputText
            label="Country"
            maxLength={30}
            name="country"
            required={false}
            setValue={setCountry}
            type="input"
            value={country}
          />
        </div>
      </div>
      <div className="row buttons">
        <div className="button">
          <Button
            label="UPLOAD AVATAR"
            onClick={onUploadAvatar}
            disabled
            styles={['formButton']}
          />
        </div>
        <div className="button">
          <Button
            label={`${!referral ? 'CREATE' : 'UPDATE'} REFERRAL`}
            onClick={onButtonClick}
            styles={['formButton', 'submitButton']}
          />
        </div>
      </div>
    </div>
  );
};

export default ReferralForm;

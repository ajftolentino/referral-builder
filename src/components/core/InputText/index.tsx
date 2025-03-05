import React, {
  FocusEventHandler,
  FormEvent,
  ForwardedRef,
  KeyboardEvent,
  KeyboardEventHandler,
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ErrorMessages } from 'components/core';

import './styles.scss';

type Props = {
  disabled?: boolean;
  disableKeypress?: boolean;
  errors?: string | string[];
  hideErrorMessages?: boolean;
  id?: string;
  label: string;
  maxLength?: number;
  name: string;
  placeholder?: string;
  readOnly?: boolean;
  required: boolean;
  type: 'input'; // can be extended to other types like password, number or text area;
  value: string;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
  // eslint-disable-next-line no-unused-vars
  setValue: (value: string) => void;
};

const InputText: React.ForwardRefRenderFunction<
  HTMLInputElement | HTMLTextAreaElement,
  React.PropsWithChildren<Props>
> = (
  {
    disabled,
    disableKeypress,
    errors,
    hideErrorMessages,
    id,
    label,
    maxLength,
    name,
    placeholder,
    readOnly,
    required,
    type,
    value,
    onBlur,
    onFocus,
    onKeyDown,
    onPressEnter,
    setValue,
  },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (errors?.length && ref && !isFocused) {
      (
        ref as MutableRefObject<HTMLInputElement | HTMLTextAreaElement>
      )?.current.focus();
      setIsFocused(true);
    }
  }, [errors?.length, isFocused, ref]);

  const onKeyPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (disableKeypress) {
        event.preventDefault();
      }
      if (event.key === 'Enter') {
        onPressEnter?.(event);
      } else {
        onKeyDown?.(event);
      }
    },
    [disableKeypress, onKeyDown, onPressEnter]
  );

  const onResetIsFocused = useCallback(() => {
    if (isFocused) {
      setIsFocused(false);
    }
  }, [isFocused]);

  const onSetIsFocused = useCallback(() => {
    if (errors?.length && !isFocused) {
      setIsFocused(true);
    }
  }, [errors?.length, isFocused]);

  const onInputChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const input = (event.target as HTMLInputElement)?.value || '';
      if (!maxLength || (!!maxLength && input.length <= maxLength)) {
        setValue(input);
        onResetIsFocused();
      }
    },
    [maxLength, onResetIsFocused, setValue]
  );

  return (
    <div
      className={`inputText${
        !!errors || (Array.isArray(errors) && errors.length)
          ? ' withErrors'
          : ''
      }`}
    >
      {label ? (
        <label htmlFor={id ?? name}>
          {label} {required ? <span className="required">*</span> : ''}{' '}
        </label>
      ) : null}
      <input
        autoCapitalize="off"
        className={`${isFocused ? 'withFocus' : ''}`}
        disabled={disabled}
        id={id ?? name}
        maxLength={maxLength}
        onInput={onInputChange}
        onKeyDown={onKeyPress}
        onBlur={onBlur}
        onFocus={onFocus || onSetIsFocused}
        placeholder={placeholder}
        readOnly={readOnly}
        ref={ref as ForwardedRef<HTMLInputElement>}
        type={type}
        value={value}
      />
      {!hideErrorMessages ? <ErrorMessages errors={errors} /> : null}
    </div>
  );
};

export default React.forwardRef(InputText);

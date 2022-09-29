import { useMemo, useRef, useState } from 'react';

import styles from './input-field-style.module.scss';

const InputField = ({ type, placeHolder, value, onChange, validateInput, setShouldValidate, showPassword, setShowPassword, errorMessage }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const inputElement = useRef(null);

  const createNameAttribute = useMemo(() => {
    const placeholderArray = placeHolder.trim().toLowerCase().split(/\s+/);

    const formattedString = placeholderArray.reduce((previous, current, index) => {
      if (!index) {
        return previous + current;
      }

      return previous + current.slice(0, 1).toUpperCase() + current.slice(1);
    }, '');

    return formattedString;
  }, [placeHolder]);
  
  function handleChange({ target }) {
    if (type === 'tel') {
      if ((/^[(][+][0-9]{1,3}[)][\s][0-9]+$/).test(target.value)) return onChange({[createNameAttribute]: target.value});
      if ((/^[(][+][0-9]{1,3}[)][\s]$/).test(target.value)) return onChange({[createNameAttribute]: ''});
      if ((/^[0-9]+$/).test(target.value)) return onChange({[createNameAttribute]: `(+234) ${target.value}`});

      return onChange({[createNameAttribute]: value});
    }

    if (type === 'amount') {
      if ((/^[0-9]+[.]{1}[0-9]{0,2}$/).test(target.value)) return onChange({[createNameAttribute]: target.value});
      if ((/^[0-9]*$/).test(target.value)) return onChange({[createNameAttribute]: target.value});

      return onChange({[createNameAttribute]: value});
    }

    if (type === 'integer') {
      if ((/^[0-9]*$/).test(target.value)) return onChange({[createNameAttribute]: target.value});

      return onChange({[createNameAttribute]: value});
    }

    return onChange({[createNameAttribute]: target.value});
  }

  function handleFocus() {
    setIsInputFocused(true);
  }

  function handleBlur() {
    setIsInputFocused(false);

    setShouldValidate?.(createNameAttribute);
  }


  function clearInput() {
    onChange({
      [createNameAttribute]: ''
    });

    requestAnimationFrame(() => {inputElement.current.focus()});
  }

  function togglePasswordVisibility() {
    setShowPassword(prev => !prev);

    requestAnimationFrame(() => {inputElement.current.focus()});
  }

  return (
    <div className={`${(validateInput?.shouldValidate && !validateInput?.isValid) ? `${styles.error} ` : ''}${styles.inputBox}`}>
      <input
        className={styles.input}
        {...(
          ((/tel|amount|integer/).test(type)) ? {inputMode: 'numeric'} :
          (type === 'password' && !showPassword) ? {type: 'password'} : {}
        )}
        placeholder={placeHolder}
        name={createNameAttribute}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputElement}
      />
      <div className={styles.icon}>
        {
          (type === 'password') ? (<i className={(showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye")} onMouseDown={togglePasswordVisibility} />) :
          (isInputFocused && value) ? (<i className="fa-solid fa-circle-xmark" onMouseDown={clearInput} />) : null
        }
      </div>
      {errorMessage && validateInput?.shouldValidate && !validateInput?.isValid &&
        <div className={styles.errorMessage}>{errorMessage}</div>
      }
    </div>
  );
};

export { InputField };

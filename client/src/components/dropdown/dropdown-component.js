import { useCallback, useMemo, useRef, useState } from 'react';

import styles from './dropdown-style.module.scss';

const Dropdown = ({ data, value, onSelect }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const [queryString, setQueryString] = useState('');

  const inputElement = useRef(null);

  const filterData = useMemo(() => {
    const myRegExp = new RegExp(queryString, 'i');
    
    return data.filter(item => myRegExp.test(item.name));
  }, [queryString, data]);

  const displayValue = useMemo(() => {
    let myData = data.find(item => item.code === value);

    return myData?.name;
  }, [data, value]);

  const handleClick = useCallback(() => {
    setShowDropdown(prev => !prev);

    if (!inputElement.current) {
      requestAnimationFrame(() => {inputElement.current.focus()});
    }
  }, []);

  const handleChange = useCallback(({ target }) => {
    setQueryString(target.value);
  }, []);

  const handleSelect = useCallback((data) => {
    onSelect(data);

    setShowDropdown(false);
    setQueryString('');
  }, [onSelect]);

  return (
    <div className={styles.menu}>
      <input
        className={styles.input}
        placeholder={displayValue || "Select Bank"}
        name="bank"
        value={displayValue || ''}
        onClick={handleClick}
        readOnly={true}
      />

      <div className={styles.icon}>
        {showDropdown ? <i className="fa-solid fa-chevron-up" /> : <i className="fa-solid fa-chevron-down" />}
      </div>

      {showDropdown &&
        <div className={styles.dropdown}>
          <input
            className={styles.input}
            placeholder="Search"
            name="bank"
            value={queryString}
            onChange={handleChange}
            ref={inputElement}
          />

          <div className={styles.entriesArea}>
            {filterData.map(item => (<div className={styles.entry} key={item.code} onClick={() => {handleSelect(item.code)}}>{item.name}</div>))}
          </div>
        </div>
      }
    </div>
  );
};

export { Dropdown };

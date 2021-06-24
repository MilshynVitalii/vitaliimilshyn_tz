import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Input.scss';

Input.defaultProps = {
  cities: [],
  dangerText: '',
  errorText: '',
  description: '',
  valid: false
};

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  changeFormData: PropTypes.func.isRequired,
  cities: PropTypes.array,
  dangerText: PropTypes.string,
  errorText: PropTypes.string,
  description: PropTypes.string,
  valid: PropTypes.bool,
};

function Input({value, type, name, label, changeFormData, cities, dangerText, errorText, description, valid}) {
  const onChange = (e) => type === 'checkbox' ? changeFormData(name, !value) : changeFormData(name, e.target.value);

  let input = null;

  switch (type) {
    case 'select':
      input = <select id={name} value={value} onChange={onChange}>
        {cities.map(({city}) => <option key={city} value={city}>{city}</option>)}
      </select>
      break;
    case 'checkbox':
      input = <input
        type={type}
        name={name}
        checked={value}
        onChange={onChange}
      />
      break;
    default:
      input = <input
        className="field__set-input"
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
      break;
  }

  return (
    <fieldset className={`row field ${name === 'select' || name === 'password-check' ? 'field_bordered' : ''}`}>
      <label htmlFor={name} className="col-3 field__label">{label}</label>
      <fieldset className={classNames('field__set', {
        field__set_check: type === 'checkbox',
        'col-4': type !== 'checkbox',
        active_danger: !valid || !value.length
      })}>
        {input}
        <span className="field__set-danger">{!value.length ? dangerText : errorText}</span>
      </fieldset>
      <div className={`${type === 'checkbox' ? 'col-8' : 'col-5'} field__text`}>{description}</div>
    </fieldset>
  )
}

export default Input;

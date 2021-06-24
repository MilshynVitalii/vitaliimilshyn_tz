import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import 'moment/locale/ru';

import Status from './components/Status';
import Input from './components/Input';

import './Form.scss';

Form.defaultProps = {
  user: `Человек №${(Math.random() * Math.pow(10, 7)).toFixed(0)}`
};

Form.propTypes = {
  user: PropTypes.string
};

function Form(props) {
  React.useEffect(() => {
    fetch('http://localhost:3000/cities.json')
    .then(res => res.json())
    .then(data => {
      const largestCity = data.sort((a, b) => a.population - b.population).reverse()[0].city;
      const cities = data.filter(({population}) => population > 50000).sort((a, b) => a.city < b.city ? -1 : 1);
      setFormData(formData.map(data => data.type !== 'select' ? data : {...data, value: largestCity, cities}));
    });
  }, []);

  const [date, setDate] = React.useState('');
  const [invalidForm, setInvalidForm] = React.useState(true);

  const [formData, setFormData] = React.useState([
    {value: '', type: 'select', name: 'select', label: 'Ваш город', valid: true, cities: []},
    {value: '', type: 'password', name: 'password', label: 'Пароль', pattern: /^[aA-zZ0-9]{5,}$/, valid: false, errorText: 'Используйте не менее 5 символов', dangerText: 'Укажите пароль', description: 'Ваш новый пароль должен содержать не менее 5 символов.'},
    {value: '', type: 'password', name: 'password-check', label: 'Пароль еще раз', valid: false, dangerText: 'Укажите пароль', errorText: 'Пароли не совпадают', description: 'Повторите пароль, пожайлуста, это обезопасит вас с нами на случай ошибки.'},
    {value: '', type: 'email', name: 'email', label: 'Электронная почта', pattern: /^.+@.+\..+$/, valid: false, dangerText: 'Укажите E-mail', errorText: 'Неверный E-mail', description: 'Можно изменить адрес, указанный при регистрации.'},
    {value: false, type: 'checkbox', name: 'checkbox', label: 'Я согласен', valid: true, description: 'принимать актуальную информацию на емейл'},
  ]);

  const changeFormData = (name, value) => {
    setInvalidForm(false);
    setFormData(formData.map(data => {
      let valid = false;
      switch (data.name) {
        case 'password':
        case 'email':
          valid = data.pattern.test(value);
          break;
        case 'password-check':
          valid = value === formData.find(el => el.name === 'password').value;
          break;
        default:
          valid = true;
          break;
      }
      
      return data.name !== name ? data : {...data, value, valid}
    }));
  }
  
  const onFormSubmit = (e) => {
    e.preventDefault();

    const valid = Object.values(formData).every(field => field.valid);
    setInvalidForm(valid);

    if(valid) {
      setDate(moment().locale('ru').format('DD MMMM YYYY в HH:mm:ss'))

      console.log(JSON.stringify(formData.map(({name, value}) => ({name, value}))));
    }
  }

  return (
    <div className="container">
      <form className={classNames('form', {invalidForm})} onSubmit={onFormSubmit}>

        <div className="row form__header">
          <div className="col-3">Здравствуйте, </div>
          <div className="col-7 form__header-user">
            <span>{props.user}</span>
            <Status />
          </div>
        </div>

        {
          formData.map(data => <Input key={data.name} {...data} changeFormData={changeFormData}/>)
        }

        <div className="form__confirm">
          <div className="row">
            <div className="col-3"></div>
            <div className="col-7">
              <input type="submit" value="Изменить" className="form__confirm-btn" />
              {!!date.length && <span className="form__confirm-date">последние изменения {date}</span>}
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}

export default Form;

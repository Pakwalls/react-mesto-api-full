import SignForm from './SignForm.js';
import { useState } from 'react';
import { withRouter } from 'react-router-dom';

function Login({ onLogin }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setLoginData({
      ...loginData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      return;
    }
    onLogin(loginData)
  }

  return (
    <SignForm 
      title={'Вход'}
      buttonHolder={'Войти'}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      data={loginData}
    />
  );
}

export default withRouter(Login);
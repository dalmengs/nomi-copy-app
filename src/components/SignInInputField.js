import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EmaliPasswordAuthenticate from '../utils/EmailPasswordAuthenticate';
import InputField from './InputField';
import SignInButton from './SignInButton';
import EmailIcon from '../static/icon/mail.svg'
import LockIcon from '../static/icon/lock.svg'

const SignInInputField = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [continueButtonLoading, setContinueButtonLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
        setEmail(location.state?.email);
    }
  }, [location.state?.email]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    setContinueButtonLoading(true);

    const authenticationRequest = async () => {
      try {
        const authenticationResult = await EmaliPasswordAuthenticate(email, password);
        if (authenticationResult === 200) {
          setContinueButtonLoading(false);
          navigate('/main');
        } else {
          setContinueButtonLoading(false);
          navigate('/signin', { state: { msg: 'Authentication failed.\nPlease check your email and password.', email } });
        }
      } catch (error) {
        setContinueButtonLoading(false);
        navigate('/signin', { state: { msg: 'Something goes wrong. Please try again later.', email } });
      }
      setContinueButtonLoading(false);
    };

    authenticationRequest();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };

  return (
    <div>
      <div className='m-3'>
        <InputField
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          onKeyDown={handleKeyDown}
          icon={EmailIcon}
        />
        <InputField
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          onKeyDown={handleKeyDown}
          icon={LockIcon}
        />
      </div>
      <div className='m-3'>
        <SignInButton signInEvent={handleSignIn} loading={continueButtonLoading}/>
      </div>
    </div>
  );
};

export default SignInInputField;

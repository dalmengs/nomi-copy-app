import React from 'react';
import BackHeader from '../components/BackHeader';
import LoginMethod from '../components/LoginMethod';
import EmailDisplay from '../components/EmailDisplay';
import DeleteAccountButton from '../components/DeleteAccountButton';

import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

const AccountSettingsPage = () => {
  const user = useUser();

  return (
    <div className="flex flex-col min-h-screen">
        <BackHeader title={"Account Settings"} to={"/profile"} />
        <div className="m-[20px] mb-[10px]">
        <LoginMethod method="Nomi.ai Account" />
      </div>
      <EmailDisplay email={user.user.email} />

      <Link to={"/profile/account/delete"} className='text-red-600 text-center mt-8 mx-4'>
        Delete account
      </Link>
    </div>
    
  );
};

export default AccountSettingsPage;

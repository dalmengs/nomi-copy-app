import React, { useState, useEffect } from 'react';
import BackHeader from '../components/BackHeader';

import InputField from '../components/InputField';
import nameIcon from '../static/icon/name.svg'
import CalendarIcon from '../static/icon/calendar.svg'
import ArrowIcon from '../static/icon/arrow_down.svg'
import ContinueButton from '../components/ContinueButton';

import { useUser } from '../context/UserContext';
import UpdateUser from '../utils/UpdateUser';

const UpdateProfilePage = () => {
    const user = useUser();

    const [name, setName] = useState('');
    const [dob, setDob] = useState(null);
    const [gender, setGender] = useState('');

    const [defaultName, setDefaultName] = useState('');
    const [defaultDob, setDefaultDob] = useState(null);
    const [defaultGender, setDefaultGender] = useState('');

    const [updateResult, setUpdateResult] = useState('');
    const [updateButtonDisable, setUpdateButtonDisable] = useState(true);

    useEffect(() => {
      setName(user.user.username);
      setDefaultName(user.user.username);
      const birthDate = new Date(user.user.user_information.birth);
      const dobUTC = new Date(Date.UTC(birthDate.getUTCFullYear(), birthDate.getUTCMonth(), birthDate.getUTCDate()));
      setDob(dobUTC);
      setDefaultDob(dobUTC);
      setGender(user.user.user_information.gender);
      setDefaultGender(user.user.user_information.gender)
    }, []);

    const [continueButtonLoading, setContinueButtonLoading] = useState(false);

    const handleNameChange = (e) => setName(e.target.value);
    const handleDobChange = (date) => setDob(date);
    const handleGenderChange = (e) => setGender(e.target.value);

    useEffect(() => {
      const isSameAsDefault = () => {
        const dateDob = new Date(dob);
        const dateDefaultDob = new Date(defaultDob);

        return name === defaultName && dateDob.toISOString() === dateDefaultDob.toISOString() && gender === defaultGender;
      };
      
      setUpdateButtonDisable(isSameAsDefault());
    }, [name, dob, gender]);

  const handleUpdateUser = () => {
        setContinueButtonLoading(true);
        const userUpdateRequest = async () => {
            try {
                const isoDob = dob.toISOString();

                const userUpdateResult = await UpdateUser(
                  user.user.user_id,
                  name,
                  isoDob,
                  gender
                );

                if(userUpdateResult.status_code === 200){
                    const birthDate = new Date(dob);
                    const dobUTC = new Date(Date.UTC(birthDate.getUTCFullYear(), birthDate.getUTCMonth(), birthDate.getUTCDate()));
                    setDefaultDob(dobUTC);
                    setDefaultGender(gender)
                    setDefaultName(name);

                    setDob(dob);
                    setName(name);
                    setGender(gender);

                    setUpdateButtonDisable(true);

                    setUpdateResult("Your profile has been updated.");

                }
                else{
                  setUpdateResult("Profile update failed. Please try again later.");
                }
                setContinueButtonLoading(false);
            }
            catch (error) {
                setContinueButtonLoading(false);
            }
        };

        userUpdateRequest();
    };


    return (
      <div className="flex flex-col h-screen justify-start">
      <BackHeader title={"Your Profile"} to={"/profile"} />
      <div className='flex flex-col items-center w-full mt-4'>
        <div className="w-11/12">
          <InputField
            id="name"
            type="text"
            placeholder="What Should We Call You?"
            value={name}
            onChange={handleNameChange}
            icon={nameIcon}
          />
        </div>
        <div className="w-11/12">
          <InputField
            id="dob"
            type="text"
            placeholder="When Were You Born?"
            value={dob}
            onChange={handleDobChange}
            icon={CalendarIcon}
            isDate={true}
          />
        </div>
        <div className="w-11/12">
          <InputField
            id="gender"
            type="text"
            placeholder="What Is Your Gender?"
            value={gender}
            onChange={handleGenderChange}
            icon={ArrowIcon}
            isSelect={true}
            options={[
              { value: 'man', label: 'Man' },
              { value: 'woman', label: 'Woman' },
            ]}
          />
        </div>
      </div>
        <div className="text-red-500 text-center">{updateResult}</div>
      <div className="w-full flex justify-center mt-4">
        <div className="w-11/12">
          <ContinueButton text={"Update"} onClick={handleUpdateUser} loading={continueButtonLoading} disabled={updateButtonDisable} />
        </div>
      </div>
    </div>
    );
};

export default UpdateProfilePage;

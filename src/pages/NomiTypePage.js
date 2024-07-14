import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import BackHeader from '../components/BackHeader';
import ContinueButton from '../components/ContinueButton';
import InputField from '../components/InputField';
import ArrowIcon from '../static/icon/arrow_down.svg'

import FriendShipIcon from '../static/icon/friendship.svg'
import RomainticIcon from '../static/icon/romantic.svg'
import MentorIcon from '../static/icon/mentor.svg'

import SelectionButton from '../components/SelectionButton';

const NomiTypePage = () => {

    const navigate = useNavigate();

    const [continueButtonLoading, setContinueButtonLoading] = useState(false);
    const [gender, setGender] = useState('man');
    const [relationship, setRelationship] = useState('friendship');

    const handleGenderChange = (e) => setGender(e.target.value);

    const handleContinue = () => {
        setContinueButtonLoading(true);

        const continueRequest = async () => {
            setContinueButtonLoading(false);
            navigate("/new/create", { state: { gender, relationship } });
        }
        continueRequest();
    };

    return (
        <div className="flex flex-col min-h-screen">
            <BackHeader title={"What Are You Looking For?"} to={"/main"} />
            <div className='m-4'>
                <div className="mt-4 text-lg">
                    What type of relationship would you like to have with your Nomi?
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex justify-center">
                        <SelectionButton 
                            icon={FriendShipIcon} 
                            label="Friendship" 
                            selected={relationship === 'friendship'} 
                            onClick={() => setRelationship('friendship')}
                        />
                    </div>
                    <div className="flex justify-center">
                        <SelectionButton 
                            icon={MentorIcon} 
                            label="Mentor" 
                            selected={relationship === 'mentor'} 
                            onClick={() => setRelationship('mentor')}
                        />
                    </div>
                    <div className="flex justify-center col-span-2">
                        <SelectionButton 
                            icon={RomainticIcon} 
                            label="Romantic" 
                            selected={relationship === 'romantic'} 
                            onClick={() => setRelationship('romantic')}
                        />
                    </div>
                </div>
                <div className="my-4 border-b border-gray-300"></div>
                <div className="text-lg m-4">
                    Please select your Nomi's gender:
                </div>
                <div>
                    <InputField
                        id="gender"
                        type="text"
                        placeholder="Nomi's Gender"
                        value={gender}
                        onChange={handleGenderChange}
                        icon={ArrowIcon}
                        isSelect={true}
                        options={[
                            { value: 'man', label: 'Man' },
                            { value: 'woman', label: 'Woman' },
                            { value: 'non-binary', label: 'Non-binary' },
                        ]}
                    />
                </div>
                <div className="w-full flex justify-center">
                    <ContinueButton text={"Continue"} onClick={handleContinue} loading={continueButtonLoading} disabled={false} />
                </div>
            </div>
        </div>
    )
}

export default NomiTypePage;

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import EditIcon from '../static/icon/edit.svg';
import InfoIcon from '../static/icon/info.svg';
import CancelIcon from '../static/icon/x.svg';
import ConfirmIcon from '../static/icon/v.svg';
import TagButton from '../components/TagButton';
import EditButton from '../components/EditButton';
import InfoIconWithMessage from '../components/InfoIconWithMessage';
import ContinueButton from '../components/ContinueButton';
import CreateNomi from '../utils/CreateNomi';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const NomiCreatePage = () => {
    const user = useUser();
    const navigate = useNavigate();

    const location = useLocation();
    const { gender, relationship } = location.state || {};

    const [name, setName] = useState('Aaron');
    const [editingName, setEditingName] = useState(name);
    const [isEditingName, setIsEditingName] = useState(false);

    const [personalityTags, setPersonalityTags] = useState(['Curious', 'Sarcastic', 'Bubbly/Positive']);
    const [interestTags, setInterestTags] = useState(['Playing Sports', 'Yoga/Meditation', 'Psychology', 'Food', 'Philosophy']);
    const [isInterestEdit, setIsInterestEdit] = useState(false);
    const [editingInterests, setEditingInterests] = useState([...interestTags]);
    const [isPersonalityEdit, setIsPersonalityEdit] = useState(false);
    const [editingPersonalities, setEditingPersonalities] = useState([...personalityTags]);
    const [continueButtonLoading, setContinueButtonLoading] = useState(false);

    const handleNameChange = (e) => setEditingName(e.target.value);
    const startEditingName = () => setIsEditingName(true);
    const cancelEditingName = () => {
        setEditingName(name);
        setIsEditingName(false);
    };
    const confirmEditingName = () => {
        setName(editingName);
        setIsEditingName(false);
    };

    const handleContinue = () => {
        setContinueButtonLoading(true);

        const continueRequest = async () => {
            try {
                const nomiCreateResult = await CreateNomi(
                    user.user.user_id,
                    name,
                    personalityTags,
                    interestTags,
                    relationship,
                    gender
                )

                if(nomiCreateResult.status_code === 200){
                    setContinueButtonLoading(false);
                    navigate(`/chat/${nomiCreateResult.data.daly_id}`);
                }
            }
            catch (error) {
                setContinueButtonLoading(false);
            }
            setContinueButtonLoading(false);
        };
        
        continueRequest();
    };

    const handleInterestEdit = () => setIsInterestEdit(true);
    const handleInterestCancel = () => {
        setEditingInterests([...interestTags]);
        setIsInterestEdit(false);
    };
    const handleInterestSave = () => {
        setInterestTags([...editingInterests]);
        setIsInterestEdit(false);
    };

    const handlePersonalityEdit = () => setIsPersonalityEdit(true);
    const handlePersonalityCancel = () => {
        setEditingPersonalities([...personalityTags]);
        setIsPersonalityEdit(false);
    };
    const handlePersonalitySave = () => {
        setPersonalityTags([...editingPersonalities]);
        setIsPersonalityEdit(false);
    };

    const toggleInterestSelection = (interest) => {
        if (editingInterests.includes(interest)) {
            setEditingInterests(editingInterests.filter(tag => tag !== interest));
        } else {
            setEditingInterests([...editingInterests, interest]);
        }
    };

    const togglePersonalitySelection = (personality) => {
        if (editingPersonalities.includes(personality)) {
            setEditingPersonalities(editingPersonalities.filter(tag => tag !== personality));
        } else {
            setEditingPersonalities([...editingPersonalities, personality]);
        }
    };

    const allInterests = [
        'Animals', 'Astronomy', 'Business', 'Coding', 'Dancing', 'D&D', 'Fitness',
        'Food', 'History', 'Mental Health', 'Mythology/folklore', 'Outdoors',
        'Philosophy', 'Playing Music', 'Playing Sports', 'Psychology', 'Reading',
        'Science', 'Sci Fi', 'Social Justice', 'Spiritual', 'Traveling', 'Vegan', 'Writing',
        'Yoga/Meditation'
    ];

    const allPersonalities = [
        'Bold/Adventurous', 'Bubbly/Positive', 'Curious', 'Deep Conversations/Intellectual',
        'Funny', 'Gentle/Quiet', 'Introverted', 'Open Minded', 'Opinionated', 'Outgoing',
        'Playful/Teasing', 'Sarcastic'
    ];

    return (
        <div className="flex flex-col min-h-screen p-4">
            {!isInterestEdit && !isPersonalityEdit && (
                <>
                    <div className="flex items-center justify-between mb-4">
                        {isEditingName ? (
                            <div className="flex items-center w-full p-2 rounded-lg">
                                <input
                                    type="text"
                                    value={editingName}
                                    onChange={handleNameChange}
                                    className="text-2xl font-bold p-[10px] pl-[20px] bg-gray-100 rounded-lg flex-grow"
                                    autoFocus
                                />
                                <button onClick={cancelEditingName} className="ml-2 border-[3px] rounded-[14px] border-[#F75555] flex-shrink-0">
                                    <img src={CancelIcon} alt="Cancel" className="w-9 cursor-pointer" />
                                </button>
                                <button onClick={confirmEditingName} className="ml-2 border-[3px] rounded-[14px] border-[#07BE75] flex-shrink-0">
                                    <img src={ConfirmIcon} alt="Confirm" className="w-9 cursor-pointer" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center w-full">
                                <span className="text-2xl font-bold">{name}</span>
                                <img
                                    src={EditIcon}
                                    alt="Edit"
                                    className="w-6 h-6 cursor-pointer ml-2"
                                    onClick={startEditingName}
                                />
                            </div>
                        )}
                    </div>
                    
                    <div className="mb-4">
                        <div className="flex items-center mb-2">
                            <h2 className="text-xl font-semibold">Personality</h2>
                            <InfoIconWithMessage description="These are core personality traits." message="Your Nomi will grow over time, but you cannot change their core personality traits after this step." />
                        </div>
                        <div className="flex flex-wrap">
                            {personalityTags.map((tag, index) => (
                                <TagButton key={index} label={tag} selected={true} />
                            ))}
                        </div>
                        <div>
                            <EditButton onClick={handlePersonalityEdit} />
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <div className="flex items-center mb-2">
                            <h2 className="text-xl font-semibold">Interests</h2>
                            <InfoIconWithMessage description="These are your Nomi's initial interests." message="Your Nomi's interests may naturally change over time, but you cannot change their initial interests after this step." />
                        </div>
                        <div className="flex flex-wrap">
                            {interestTags.map((tag, index) => (
                                <TagButton key={index} label={tag} selected={true} />
                            ))}
                        </div>
                        <div>
                            <EditButton onClick={handleInterestEdit} />
                        </div>
                    </div>

                    <div className="w-full flex justify-center mt-[15px]">
                        <ContinueButton text={"Start Chatting"} onClick={handleContinue} loading={continueButtonLoading} disabled={continueButtonLoading} />
                    </div>
                </>
            )}

            {isInterestEdit && (
                <div className="flex flex-col min-h-screen p-4">
                    <div className="flex items-center mb-4">
                        <h2 className="text-xl font-semibold">Interests</h2>
                    </div>
                    <div className="flex flex-wrap mb-4">
                        {allInterests.map((interest, index) => (
                            <TagButton
                                key={index}
                                label={interest}
                                selected={editingInterests.includes(interest)}
                                onClick={() => toggleInterestSelection(interest)}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between">
                        <button onClick={handleInterestCancel} className="bg-gray-200 text-gray-700 p-4 rounded-full w-full max-w-xs mr-2">
                            Cancel
                        </button>
                        <button onClick={handleInterestSave} className="bg-purple-500 text-white p-4 rounded-full w-full max-w-xs">
                            Save
                        </button>
                    </div>
                </div>
            )}

            {isPersonalityEdit && (
                <div className="flex flex-col min-h-screen p-4">
                    <div className="flex items-center mb-4">
                        <h2 className="text-xl font-semibold">Personality</h2>
                    </div>
                    <div className="flex flex-wrap mb-4">
                        {allPersonalities.map((personality, index) => (
                            <TagButton
                                key={index}
                                label={personality}
                                selected={editingPersonalities.includes(personality)}
                                onClick={() => togglePersonalitySelection(personality)}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between">
                        <button onClick={handlePersonalityCancel} className="bg-gray-200 text-gray-700 p-4 rounded-full w-full max-w-xs mr-2">
                            Cancel
                        </button>
                        <button onClick={handlePersonalitySave} className="bg-purple-500 text-white p-4 rounded-full w-full max-w-xs">
                            Save
                        </button>
                    </div>
                </div>
            )}


        </div>
    );
};

export default NomiCreatePage;

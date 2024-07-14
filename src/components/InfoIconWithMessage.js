import React, { useState, useEffect, useRef } from 'react';
import InfoIcon from '../static/icon/info.svg';

const InfoIconWithMessage = ({ description, message }) => {
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const messageRef = useRef(null);

    const handleIconClick = () => {
        setIsMessageVisible(!isMessageVisible);
    };

    const handleClickOutside = (event) => {
        if (messageRef.current && !messageRef.current.contains(event.target)) {
            setIsMessageVisible(false);
        }
    };

    useEffect(() => {
        if (isMessageVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMessageVisible]);

    return (
        <div className="relative w-[400px]">
            <img
                src={InfoIcon}
                alt="Info"
                className="w-4 h-4 ml-2 border border-[#9813FF] rounded-full cursor-pointer"
                onClick={handleIconClick}
            />
            {isMessageVisible && (
                <div
                    ref={messageRef}
                    className="absolute top-6 left-0 bg-white p-2 rounded shadow-md text-sm text-black z-10 bg-[#F6E6FF] border-[1px] border-[#EDD6FF]"
                    style={{ maxWidth: '200px' }}
                >
                    <span className='font-bold'>
                        {description}
                    </span>
                    &nbsp;
                    {message}
                </div>
            )}
        </div>
    );
};

export default InfoIconWithMessage;

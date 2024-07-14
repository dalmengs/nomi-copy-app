import React from 'react';

const DalyChat = ({ message, time }) => {
    const formatMessage = (message) => {
        return message.split('\n').map((str, index) => (
        <p key={index}>
            {str}
        </p>
        ));
    };

    function convertDateFormat(isoDateString) {
        if(isoDateString.length === 0) return '';

        const date = new Date(isoDateString);
        const now = new Date();
    
        const isToday = (date.getFullYear() === now.getFullYear() &&
                        date.getMonth() === now.getMonth() &&
                        date.getDate() === now.getDate());
    
        const isYesterday = (date.getFullYear() === now.getFullYear() &&
                             date.getMonth() === now.getMonth() &&
                             date.getDate() === (now.getDate() - 1));
    
        if (isToday) {
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            return `${formattedHours}:${formattedMinutes} ${ampm}`;
        } else if (isYesterday) {
            return 'Yesterday';
        } else {
            const options = { month: 'short', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        }
    }

    return (
        <div className="flex items-end mb-4">
            <div className="flex flex-col items-start w-full">
                <div className="bg-gray-200 text-black p-3 rounded-xl max-w-[70%]  break-words">
                    {formatMessage(message)}
                </div>
                <span className="text-gray-500 text-sm mt-1">{convertDateFormat(time)}</span>
            </div>
        </div>
    );
};

export default DalyChat;

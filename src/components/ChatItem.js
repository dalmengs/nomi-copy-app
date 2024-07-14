import React from 'react';
import { Link } from 'react-router-dom';

const ChatItem = ({ name, lastMessage, time, unreadMessages, to }) => {
    return (
        <Link to={to} className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex flex-col">
                <span className="font-bold text-lg">{name}</span>
                <span className="text-gray-500">{lastMessage}</span>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-gray-400 text-sm">{time}</span>
                {unreadMessages > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mt-1">
                        {unreadMessages}
                    </span>
                )}
            </div>
        </Link>
    );
};

export default ChatItem;

import React, { useState, useRef, useEffect } from 'react';
import SendIcon from '../static/icon/send.svg';

const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);

    const handleSendMessage = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [message]);

    return (
        <div className="flex items-center p-4">
            <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-grow p-2 border rounded-lg mr-4 resize-none max-h-28"
                rows={1}
                style={{ overflowY: 'auto' }}
            />
            <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className={`p-2 rounded-full ${message.trim() ? 'bg-purple-500' : 'bg-gray-300'} flex items-center justify-center`}
            >
                <img src={SendIcon} alt="Send" className="w-5 h-5" />
            </button>
        </div>
    );
};

export default MessageInput;

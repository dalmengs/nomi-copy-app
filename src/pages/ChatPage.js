import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../context/UserContext';
import DalyChat from '../components/DalyChat';
import UserChat from '../components/UserChat';
import { useNavigate } from 'react-router-dom';
import MessageInput from '../components/MessageInput';
import ChatHeader from '../components/ChatHeader';
import { useParams } from 'react-router-dom';
import FindDaly from '../utils/FindDaly';

const ChatPage = () => {
    const user = useUser();
    const navigate = useNavigate();
    const { daly_id } = useParams();
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const websocketRef = useRef(null);
    const [dalyname, setDalyname] = useState(null);

    const handleSendMessage = (message) => {
        const newMessage = { type: 'user', message, time: new Date().toISOString() };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        
        // Send message to websocket server
        if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
            websocketRef.current.send(JSON.stringify({
                user_id: user.user.user_id,
                daly_id: daly_id,
                transcript: message
            }));
        }
    };

    useEffect(() => {
        const connectWebSocket = () => {
            const websocket = new WebSocket(`ws://${process.env.REACT_APP_SOCKET_IP}:${process.env.REACT_APP_SOCKET_PORT}/chat`);
            websocketRef.current = websocket;

            websocket.onopen = () => {
                console.log('WebSocket connection opened.');
                websocket.send(JSON.stringify({
                    user_id: user.user.user_id,
                    daly_id: daly_id
                }));
            };

            websocket.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if(data.status_code === 200){
                    const newMessage = { type: 'daly', message: data.data.daly_response, time: data.data.time };
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                }
            };

            websocket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            websocket.onclose = () => {
                console.log('WebSocket connection closed.');
            };
        };

        connectWebSocket();

        return () => {
            if (websocketRef.current) {
                websocketRef.current.close();
            }
        };
    }, [daly_id, user.user.user_id]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        const findDalyRequest = async () => {
            try {
                let ret = []

                const findDalyResult = await FindDaly(daly_id);
                
                if(findDalyResult.status_code === 200){
                    setDalyname(findDalyResult.data.name)
                }
            }
            catch (error) {
                return navigate("/chat")
            }
        };

        findDalyRequest();
    }, []);


    return (
        <div className="flex flex-col h-screen">
            <ChatHeader title={dalyname} to={"/chat"} />
            <div className="flex-grow p-4 overflow-y-auto">
                {messages.map((msg, index) =>
                    msg.type === 'daly' ? (
                        <DalyChat key={index} message={msg.message} time={msg.time} />
                    ) : (
                        <UserChat key={index} message={msg.message} time={msg.time} />
                    )
                )}
                <div ref={messagesEndRef} />
            </div>
            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatPage;

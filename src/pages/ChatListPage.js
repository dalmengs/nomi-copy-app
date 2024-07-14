import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import BackHeader from '../components/BackHeader';
import ChatItem from '../components/ChatItem';
import FindChatList from '../utils/GetChatList';

const ChatListPage = () => {
    const user = useUser();
    const navigate = useNavigate();
    const [chatList, setChatList] = useState([]);

    const fetchChatList = async () => {
        const chatListRequest = async () => {
            try {
                let ret = []

                const chatListResult = await FindChatList(user.user.user_id);
                
                if(chatListResult.status_code === 200){
                    let chatListData = chatListResult.data;
                    for(let i = 0; i < chatListData.length; i++){
                        ret.push({
                            name: chatListData[i].name,
                            lastMessage: '',
                            time: '',
                            unreadMessages: 0,
                            daly_id: chatListData[i].daly_id
                        })
                    }
                }
                return ret;
            }
            catch (error) {
                return navigate("/new")
            }
        };

        let result = await chatListRequest();
        console.log(result);
        return result;
    };

    useEffect(() => {
        const fetchData = async () => {
            const newChatList = await fetchChatList(user);
            setChatList(newChatList);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const fetchData = async () => {
                const newChatList = await fetchChatList(user);
                setChatList(newChatList);
            };

            fetchData();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

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
        <div className="flex flex-col h-screen justify-start">
            <BackHeader title={"Chats"} to={"/main"} />
            <div className="flex flex-col overflow-y-auto">
                {chatList.map((chat, index) => (
                    <ChatItem
                        key={index}
                        name={chat.name}
                        lastMessage={chat.lastMessage}
                        time={convertDateFormat(chat.time)}
                        unreadMessages={chat.unreadMessages}
                        to={`/chat/${chat.daly_id}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ChatListPage;

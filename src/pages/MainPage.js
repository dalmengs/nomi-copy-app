import React from 'react'
import MainHeader from '../components/MainHeader';
import MainFooter from '../components/MainFooter';
import Notification from '../components/Notification';
import { useUser } from '../context/UserContext';

const MainPage = () => {
    const user = useUser();

    return (
        <div className="flex flex-col min-h-screen">
            <MainHeader username={user.user.username}/>
            <main className="flex-grow overflow-auto p-4 pb-20"> {/* Added padding-bottom */}
                <Notification />
            </main>
            <MainFooter optionId={0}/>
        </div>
    )
}

export default MainPage;
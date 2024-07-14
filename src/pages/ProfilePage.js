import React from 'react';
import Header from '../components/Header';
import MainFooter from '../components/MainFooter';

import MenuItem from '../components/MenuItem';
import LogoutItem from '../components/LogoutItem';
import UpgradeItem from '../components/UpgradeItem';

import ProfileSettingsIcon from '../static/icon/profile_settings.png'
import AccountSettingsIcon from '../static/icon/account_settings.png'
import NomiInformation from '../static/icon/nomi_information.png'
import HelpIcon from '../static/icon/help.png'
import DiscordIcon from '../static/icon/discord.png'
import LogoutIcon from '../static/icon/logout.png'

const menuItems = [
  { label: 'Profile Settings', icon: ProfileSettingsIcon, to: "/profile/profile" },
  { label: 'Account Settings', icon: AccountSettingsIcon, to: "/profile/account" },
  { label: 'Nomi Information', icon: NomiInformation, to: "/profile/nomis" },
  { label: 'Help', icon: HelpIcon, to: "/profile/help" },
  { label: 'Discord', icon: DiscordIcon, to: `${process.env.REACT_APP_DISCORD_URL}` },
];

const ProfileMenu = () => {
  return (
    <div className="flex flex-col min-h-screen">
        <Header title={"Profile"} />
        <UpgradeItem />
        <div className="bg-white rounded-lg overflow-hidden pb-20">
            {menuItems.map((item, index) => (
                <MenuItem key={index} label={item.label} icon={item.icon} to={item.to} />
            ))}
            <LogoutItem label="Logout" icon={LogoutIcon} />
        </div>
        <MainFooter optionId={3}/>
    </div>
    
  );
};

export default ProfileMenu;

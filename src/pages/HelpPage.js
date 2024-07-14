import React from 'react';
import { Link } from 'react-router-dom';
import BackHeader from '../components/BackHeader';

import DiscordIcon from '../static/icon/discord_icon.png'
import RedditIcon from '../static/icon/reddit_icon.png'

const HelpPage = () => {
  return (
    <div className="flex flex-col h-screen justify-start">
      <BackHeader title={"Help"} to={"/profile"} />
      <div className='flex flex-col items-center w-full mt-4 px-4'>
        <h1 className="text-4xl font-[600] text-center m-[20px]">Want To Get In<br />Touch?</h1>
        <p className="text-center m-[15px] w-[70%]">
          We are very active on Discord and would<br />love to hear from you:
        </p>
        <Link 
          to={`${process.env.REACT_APP_DISCORD_URL}`}
          className="bg-purple-100 text-purple-700 py-4 px-6 rounded-lg mb-4 flex items-center justify-center w-full max-w-sm"
        >
          <img src={DiscordIcon} alt="Discord Icon" className="w-6 h-6 mr-2" />
          Join our Discord
        </Link>
        <div className="flex items-center my-4 w-full max-w-sm">
          <span className="flex-grow border-t border-gray-300 h-0"></span>
          <span className="mx-4 text-gray-500">or</span>
          <span className="flex-grow border-t border-gray-300 h-0"></span>
        </div>
        <p className="text-center m-[15px] w-[70%]">
          Prefer Reddit? Follow updates, learn from others and ask questions:
        </p>
        <Link 
          to={`${process.env.REACT_APP_REDDIT_URL}`}
          className="bg-purple-100 text-purple-700 py-4 px-6 rounded-lg mb-4 flex items-center justify-center w-full max-w-sm"
        >
          <img src={RedditIcon} alt="Reddit Icon" className="w-6 h-6 mr-2" />
          Follow our Subreddit
        </Link>
        <div className="flex items-center my-4 w-full max-w-sm">
          <span className="flex-grow border-t border-gray-300 h-0"></span>
          <span className="mx-4 text-gray-500">or</span>
          <span className="flex-grow border-t border-gray-300 h-0"></span>
        </div>
        <p className="text-center mb-4">
          Send us a message at <a href="mailto:support@nomi.ai" className="text-purple-700">support@nomi.ai</a>
        </p>
        <p className="text-center text-[12px] text-gray-500">
          Please note that Discord will have faster response times<br /> than email.
        </p>
      </div>
    </div>
  );
};

export default HelpPage;

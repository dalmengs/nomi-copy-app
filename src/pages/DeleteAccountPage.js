import React, { useState, useEffect } from 'react';
import BackHeader from '../components/BackHeader';
import DeleteAccountButton from '../components/DeleteAccountButton';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import CodeInput from '../components/CodeInput';
import ResendCodeLink from '../components/ResendCodeLink';
import SendEmail from '../utils/SendEmail';
import VerifyEmail from '../utils/VerifyEmail';
import DeleteUser from '../utils/DeleteUser';


const DeleteAccountPage = () => {
    const [sendButtonLoading, setSendButtonLoading] = useState(false);
    const [isVerificationVisible, setIsVerificationVisible] = useState(false);
    const [emailSentResult, setEmailSentResult] = useState(false);
    const [code, setCode] = useState(new Array(6).fill(''));
    const [isDisabled, setIsDisabled] = useState(true);
    const [isDeleteFilled, setIsDeleteFilled] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const user = useUser();
    const navigate = useNavigate();

    //^ 이메일 전송 핸들러 
    const handleSendEmail = () => {
        setSendButtonLoading(true);

        // 이메일 확인 전송 
        const emailSendRequest = async () => {
            try {
                // 이메일 전송 
                const emailSendResult = await SendEmail(user.user.email);
                setEmailSentResult(emailSendResult.msg);

                // 이메일 전송에 성공했으면, 다음 입력창 보이도록 하기 
                if(emailSendResult.status_code === 200){
                    setIsVerificationVisible(true);
                }
                setSendButtonLoading(false);
            }
            catch (error) {
                setEmailSentResult("Please Try Again Later");
                setSendButtonLoading(false);
            }
            setSendButtonLoading(false);
        };

        emailSendRequest();
    };

    const handleCodeChange = (newCode) => {
        setCode(newCode);
        setIsDisabled(!newCode.every(char => char !== ''));
        setInputValue('');
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
    
        if (value === 'DELETE') {
          setIsDeleteFilled(true);
        } else {
          setIsDeleteFilled(false);
        }
      };

    const handleResend = () => {
        setSendButtonLoading(true);

        // 이메일 확인 전송 
        const emailSendRequest = async () => {
            try {
                // 이메일 전송 
                const emailSendResult = await SendEmail(user.user.email);
                setEmailSentResult(emailSendResult.msg);

                // 이메일 전송에 성공했으면, 다음 입력창 보이도록 하기 
                if(emailSendResult.status_code === 200){
                    setEmailSentResult("Verification email sucessfully resent");
                }
                setSendButtonLoading(false);
            }
            catch (error) {
                setEmailSentResult("Please Try Again Later");
                setSendButtonLoading(false);
            }
        };

        emailSendRequest();
    };

    const handleVerify = () => {
        setSendButtonLoading(true);
      
        const emailVerifyRequest = async () => {
          try {
            const currentCode = code.join('');
      
            // 이메일 확인하기 
            const emailVerifyResult = await VerifyEmail(user.user.email, currentCode);
            setEmailSentResult(emailVerifyResult.msg);
      
            // 이메일 확인에 성공했으면, 다음 입력창 보이도록 하기 
            if (emailVerifyResult.status_code === 200) {
              await handleUserDeletion();
            } else {
              setEmailSentResult(emailVerifyResult.msg);
              setSendButtonLoading(false);
            }
          } catch (error) {
            setEmailSentResult("Please Try Again Later");
            setSendButtonLoading(false);
          }
        };
      
        const handleUserDeletion = async () => {
          try {
            const deleteResult = await DeleteUser(user.user.user_id);
      
            if (deleteResult.status_code === 200) {
              localStorage.setItem("daly_authentication_token", "");
              navigate("/signin");
            } else {
              setEmailSentResult("Account Delete Failed. Please Try Again Later.");
            }
          } catch (error) {
            setEmailSentResult("Account Delete Failed. Please Try Again Later.");
          } finally {
            setSendButtonLoading(false);
          }
        };
      
        emailVerifyRequest();
      };

    return (
        <div className="flex flex-col min-h-screen">
            <BackHeader title={"Account Settings"} to={"/profile/account"} />
            <div className='p-[20px]'>
                <h2 className="text-lg font-bold mb-2">
                Are you sure you want to permanently delete your Nomi.ai account?
                </h2>
                <p className="mb-4">
                This will permanently delete all data associated with your account, including all Nomis and their entire message history.
                <strong> Deleting your account is not recoverable and should be done with caution.</strong>
                To prevent accidental account deletions, your account deletion will be verified by email.
                </p>
                <p>
                If you are sure you want to delete your Nomi.ai account, click on the button below to send a code to your email.
                </p>
            </div>

            {!isVerificationVisible && (
                <DeleteAccountButton onClick={handleSendEmail} disabled={false} loading={sendButtonLoading} content={'Send Delete Account Confirmation'} />
            )}
            {isVerificationVisible && (
                <div className="p-4 flex flex-col items-center">
                <div className="w-full">
                  <h2 className="text-lg text-left">Enter your code below:</h2>
                  <div className="text-left">
                    <ResendCodeLink onResend={handleResend} />
                  </div>
                </div>
                <div className="p-4 flex flex-col items-center">
                  <CodeInput code={code} handleCodeChange={handleCodeChange} />
                </div>
                <div className='text-[#FF0000]'>
                  {emailSentResult}
                </div>
                {!isDisabled && (
                    <div className="p-4 flex flex-col items-center w-full">
                    <label className="block text-lg text-left w-full">
                      Type "DELETE" to confirm:
                    </label>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleChange}
                      className="w-[100%] p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                )}
                <DeleteAccountButton onClick={handleVerify} disabled={!isDeleteFilled} loading={sendButtonLoading} content={"Delete Nomi.ai Account"} />
              </div>
            )}

            <Link to={"/profile/account"} className='m-[20px] text-[#A738FE] font-bold underline text-[20px] text-center'>
                Take me back to safety!
            </Link>
            <div className='pl-[20px]'>
                If you have any questions or concerns, please do not hestitate to reach out to us at
            </div>
            <div className='pl-[20px]'>
                <Link className='text-[#A738FE] font-bold underline'>
                    support@nomi.ai
                </Link>
                &nbsp;or on&nbsp;
                <Link className='text-[#A738FE] font-bold underline'>
                    discord
                </Link>
            </div>
        </div>
    );
};

export default DeleteAccountPage;

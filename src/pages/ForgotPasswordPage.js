import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import InputField from '../components/InputField';
import ContinueButton from '../components/ContinueButton';
import SendButton from '../components/SendButton';

import EmailIcon from '../static/icon/mail.svg'
import EmailCheckIcon from '../static/icon/mail_read.svg'
import LockIcon from '../static/icon/lock.svg'
import LockCheckIcon from '../static/icon/lock_plus.svg'

import SendPasswordEmail from '../utils/SendPasswordEmail';
import ChangePassword from '../utils/ChangePassword';

import ValidateEmail from '../utils/ValidateEmail';

const ForgotPasswordPage = () => {
    //^ 회원가입 성공 시 리다이렉트 
    const navigate = useNavigate();

    //^ 상태 관리 변수 
    //? Vars
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [sendButtonLoading, setSendButtonLoading] = useState(false);
    const [continueButtonLoading, setContinueButtonLoading] = useState(false);

    //? State Messages
    const [passwordMsg, setPasswordMsg] = useState(''); // 패스워드 일치 여부 메시지 
    const [emailSentResult, setEmailSentResult] = useState(''); // 이메일 전송 성공 여부 메시지 
    const [passwordChangeResult, setPasswordChangeResult] = useState(''); // 비밀번호 변경 결과 메시지 

    //? Visible
    const [isEmailReadOnly, setIsEmailReadOnly] = useState(false); // 이메일을 보낸 순간 이메일은 수정이 안 된다. 변경된 비밀번호를 넣는 칸이 뜬다.
    const [isVerificationVisible, setIsVerificationVisible] = useState(false); // 이메일을 보낸 순간, 인증 번호를 넣는 칸이 뜬다. 이메일을 인증한 순간, 인증 번호를 넣는 칸이 사라진다.
    const [isContinueVisible, setIsContinueVisible] = useState(false); // 모든 칸을 다 입력하면, 비밀번호를 바꿀 수 있다.
    
    //? Flags
    const [isPasswordMatched, setIsPasswordMatched] = useState(true); // 패스워드가 일치하는가

    //^ 입력 필드 핸들러 
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handlePasswordCheckChange = (e) => setPasswordCheck(e.target.value);
  
    //^ 비밀번호 유효성 확인
    const validatePassword = (password, passwordCheck) => {
        const hasNumber = /[0-9]/.test(password);
        const hasAlphabet = /[a-zA-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isValidLength = password.length >= 8;

        if(password.length === 0 && passwordCheck.length === 0){
            setPasswordMsg("");
            setIsPasswordMatched(false);
        }
        else if(password !== passwordCheck){
            setPasswordMsg("Password Not Matched");
            setIsPasswordMatched(false);
        }
        else if(hasNumber && hasAlphabet && hasSpecialChar && isValidLength){
            setIsPasswordMatched(true);
        }
        else{
            setPasswordMsg("Password is not safe.\n· Must contain at least one number, one letter, and one special character.\n· Must be at least 8 characters long")
            setIsPasswordMatched(false);  
        }
    };

    //^ 모든 필드가 유효해야 `Change Password` 버튼이 활성화 됨 
    const checkContinueVisibility = () => {
        if (currentPassword && isPasswordMatched) {
            setIsContinueVisible(true);
        }
        else {
            setIsContinueVisible(false);
        }
    };

    //^ `Change Password` 버튼 상태 변경 
    useEffect(() => {
      checkContinueVisibility();
    }, [currentPassword, isPasswordMatched]);

    //^ 비밀번호 유효성 검사 
    useEffect(() => {
        validatePassword(password, passwordCheck);
    }, [password, passwordCheck]);

    //^ 이메일 전송 핸들러 
    const handleSendEmail = () => {
        setSendButtonLoading(true);

        if(!ValidateEmail(email)) {
            setEmailSentResult("Invalid Email Format");
            setSendButtonLoading(false);
            return;
        }

        const emailSendRequest = async () => {
            try {
                // 이메일 전송 
                const emailSendResult = await SendPasswordEmail(email);
                setEmailSentResult(emailSendResult.msg);

                // 이메일 전송에 성공했으면, 다음 입력창 보이도록 하기 
                if(emailSendResult.status_code === 200){
                    setIsVerificationVisible(true);
                    setIsEmailReadOnly(true);
                }
            }
            catch (error) {
                setEmailSentResult("Please Try Again Later.");
                setSendButtonLoading(false);
            }
            setSendButtonLoading(false);
        };

        emailSendRequest();
    };

    //^ 개행 문자 변환 
    const formatMessage = (message) => {
        return message.split('\n').map((str, index) => (
        <p key={index} className="text-red-500 text-center">
            {str}
        </p>
        ));
    };

    //^ 비밀번호 변경하기 
    const handleChangeEmail = () => {
        setContinueButtonLoading(true);

        const passwordChangeRequest = async () => {
            try {
                const passwordChangeResult = await ChangePassword(
                    email,
                    currentPassword,
                    password
                );
                setPasswordChangeResult(passwordChangeResult.msg);

                if(passwordChangeResult.status_code === 200){
                    setContinueButtonLoading(false);
                    navigate('/signin');
                }
                else{
                    setPasswordChangeResult(passwordChangeResult.msg);
                    setContinueButtonLoading(false);
                }
            }
            catch (error) {
                setPasswordChangeResult("Please Try Again Later");
                setContinueButtonLoading(false);
            }
            setContinueButtonLoading(false);
        };

        passwordChangeRequest();
    };

    //^ 이 페이지로 들어오면, 자동으로 로그아웃 됨 
    useEffect(() => {
        localStorage.setItem('daly_authentication_token', "");
    }, []);

    return (
        <div className="flex flex-col justify-start h-screen p-4">
            <Header title="Password Change:" />

            <div className="flex flex-col items-center w-full mt-4">
                <InputField
                    id="email"
                    type="text"
                    placeholder="What is your email?"
                    value={email}
                    onChange={handleEmailChange}
                    icon={EmailIcon}
                    readOnly={isEmailReadOnly}
                />

                {!isEmailReadOnly && (<>
                    <SendButton onClick={handleSendEmail} text={"Send Password Change Email"} loading={sendButtonLoading}/>
                </>)}
            
                <div className="text-red-500 mb-5">{emailSentResult}</div>
                {isVerificationVisible && (<>
                    <InputField
                        id="currentPassword"
                        type="password"
                        placeholder="Enter Password in Email You Received"
                        value={currentPassword}
                        onChange={handleCurrentPasswordChange}
                        icon={EmailCheckIcon}
                    />

                    <InputField
                        id="password"
                        type="password"
                        placeholder="Your New Secret Password..."
                        value={password}
                        onChange={handlePasswordChange}
                        icon={LockIcon}
                    />
                    <InputField
                        id="passwordCheck"
                        type="password"
                        placeholder="New Password again..."
                        value={passwordCheck}
                        onChange={handlePasswordCheckChange}
                        icon={LockCheckIcon}
                    />
                    {!isPasswordMatched && (
                        <div className="text-red-500 mb-5">{passwordMsg && formatMessage(passwordMsg)}</div>
                    )}
                    <div className="text-red-500 mb-5">{passwordChangeResult}</div>
                </>)}
            </div>

            <div className="mt-auto w-full">
                <ContinueButton text={"Change Password"} onClick={handleChangeEmail} loading={continueButtonLoading} disabled={!isContinueVisible} />
            </div>
        </div>
    );
};

export default ForgotPasswordPage;

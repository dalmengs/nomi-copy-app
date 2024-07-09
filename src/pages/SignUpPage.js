import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';

import InputField from '../components/InputField';
import ContinueButton from '../components/ContinueButton';
import SendButton from '../components/SendButton';
import VerifyButton from '../components/VerifyButton';

import nameIcon from '../static/icon/name.svg'
import CalendarIcon from '../static/icon/calendar.svg'
import ArrowIcon from '../static/icon/arrow_down.svg'
import EmailIcon from '../static/icon/mail.svg'
import EmailCheckIcon from '../static/icon/mail_read.svg'
import LockIcon from '../static/icon/lock.svg'
import LockCheckIcon from '../static/icon/lock_plus.svg'

import SendEmail from '../utils/SendEmail';
import UserExistCheck from '../utils/UserExistCheck';
import VerifyEmail from '../utils/VerifyEmail';
import SignUp from '../utils/SignUp';

import ValidateEmail from '../utils/ValidateEmail';

const SignUpPage = () => {

    //^ 회원가입 성공 시 리다이렉트 
    const navigate = useNavigate();

    //^ 상태 관리 변수 
    //? Vars
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState(null);
    const [gender, setGender] = useState('');

    //? State Messages
    const [passwordMsg, setPasswordMsg] = useState(''); // 패스워드 일치 여부 메시지 
    const [emailSentResult, setEmailSentResult] = useState(''); // 이메일 전송 성공 여부 메시지 
    const [signUpResult, setSignUpResult] = useState(''); // 회원가입 결과 메시지 

    //? Visible
    const [isEmailReadOnly, setIsEmailReadOnly] = useState(false); // 이메일을 보낸 순간 이메일은 수정이 안 된다. 
    const [isVerificationVisible, setIsVerificationVisible] = useState(false); // 이메일을 보낸 순간, 인증 번호를 넣는 칸이 뜬다. 이메일을 인증한 순간, 인증 번호를 넣는 칸이 사라진다.
    const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일을 인증한 순간, 추가 정보를 입력하는 칸이 뜬다.
    const [isContinueVisible, setIsContinueVisible] = useState(false); // 모든 칸을 다 입력하면, 회원가입을 할 수 있다.

    //? Flags
    const [isPasswordMatched, setIsPasswordMatched] = useState(true); // 패스워드가 일치하는가
  
    //^ 입력 필드 핸들러 
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleVerificationCodeChange = (e) => setVerificationCode(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handlePasswordCheckChange = (e) => setPasswordCheck(e.target.value);
    const handleNameChange = (e) => setName(e.target.value);
    const handleDobChange = (date) => setDob(date);
    const handleGenderChange = (e) => setGender(e.target.value);
  
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

    //^ 모든 필드가 유효해야 `Continue` 버튼이 활성화 됨 
    const checkContinueVisibility = () => {
      if (isEmailVerified && isPasswordMatched && name && dob && gender) {
        setIsContinueVisible(true);
      } else {
        setIsContinueVisible(false);
      }
    };
  
    //^ `Continue` 버튼 상태 변경 
    useEffect(() => {
      checkContinueVisibility();
    }, [isEmailVerified, isPasswordMatched, name, dob, gender]);

    //^ 비밀번호 유효성 검사 
    useEffect(() => {
        validatePassword(password, passwordCheck);
    }, [password, passwordCheck]);

    //^ 이메일 전송 핸들러 
    const handleSendEmail = () => {
        // 이메일 형식 확인 
        if(!ValidateEmail(email)) {
            setEmailSentResult("Invalid Email Format");
            return;
        }

        // 이메일 확인 전송 
        const emailSendRequest = async () => {
            try {
                // 사용자가 존재하는지 확인 
                const userCheckResult = await UserExistCheck(email);
                if(userCheckResult.status_code !== 200){
                    setEmailSentResult("Email Already Exists.");
                    return;
                }
                
                // 이메일 전송 
                const emailSendResult = await SendEmail(email);
                setEmailSentResult(emailSendResult.msg);

                // 이메일 전송에 성공했으면, 다음 입력창 보이도록 하기 
                if(emailSendResult.status_code === 200){
                    setIsVerificationVisible(true);
                    setIsEmailReadOnly(true);
                }
            }
            catch (error) {
                setEmailSentResult("Please Try Again Later");
            }
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

    //^ 이메일 확인 핸들러 
    const handleVerifyEmail = () => {
        const emailVerifyRequest = async () => {
            try {
                // 이메일 확인하기 
                const emailVerifyResult = await VerifyEmail(email, verificationCode);
                setEmailSentResult(emailVerifyResult.msg);

                // 이메일 확인에 성공했으면, 다음 입력창 보이도록 하기 
                if(emailVerifyResult.status_code === 200){
                    setIsEmailVerified(true);
                }
                else{
                    setEmailSentResult(emailVerifyResult.msg);
                }
            }
            catch (error) {
                setEmailSentResult("Please Try Again Later");
            }
        };

        emailVerifyRequest();
    };

    //^ 회원가입 진행하기 
    const handleContinue = () => {
        const signUpRequest = async () => {
            try {
                // 회원가입 요청 보내기 
                const signUpResult = await SignUp(
                    email,
                    password,
                    name,
                    dob,
                    gender
                )

                // 회원가입에 성공했으면 메인 화면으로 리다이렉트 
                if(signUpResult === 200){
                    navigate('/main');
                }
                else{
                    setSignUpResult("Please Try Again Later");
                }
            } catch (error) {
                setSignUpResult("Please Try Again Later");
            }
        };

        signUpRequest();
  };

    //^ 이 페이지로 들어오면, 자동으로 로그아웃 됨 
    useEffect(() => {
        localStorage.setItem('daly_authentication_token', "");
    }, []);

    return (
        <div className="flex flex-col justify-start h-screen p-4">
            <Header title="A Few Questions About You:" />

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

                {!isEmailVerified && (<>

                    {!isEmailReadOnly && (<>
                        <SendButton onClick={handleSendEmail} text={"Send Verification Email"}/>
                    </>)}
                    
                    <div className="text-red-500 mb-5">{emailSentResult}</div>

                    {isVerificationVisible && (<>
                        <InputField
                            id="verificationCode"
                            type="text"
                            placeholder="Verify your email"
                            value={verificationCode}
                            onChange={handleVerificationCodeChange}
                            icon={EmailCheckIcon}
                        />
                        <VerifyButton onClick={handleSendEmail} text={"Verify Email"}/>
                    </>)}
                </>)}

                <InputField
                    id="password"
                    type="password"
                    placeholder="Your secret password..."
                    value={password}
                    onChange={handlePasswordChange}
                    icon={LockIcon}
                />

                <InputField
                    id="passwordCheck"
                    type="password"
                    placeholder="Password again..."
                    value={passwordCheck}
                    onChange={handlePasswordCheckChange}
                    icon={LockCheckIcon}
                />

                {!isPasswordMatched && (
                <div className="text-red-500 mb-5">{passwordMsg && formatMessage(passwordMsg)}</div>
                )}

                {isEmailVerified && (<>
                    <InputField
                        id="name"
                        type="text"
                        placeholder="What Should We Call You?"
                        value={name}
                        onChange={handleNameChange}
                        icon={nameIcon}
                    />
                    <InputField
                        id="dob"
                        type="text"
                        placeholder="When Were You Born?"
                        value={dob}
                        onChange={handleDobChange}
                        icon={CalendarIcon}
                        isDate={true}
                    />
                    <InputField
                        id="gender"
                        type="text"
                        placeholder="What Is Your Gender?"
                        value={gender}
                        onChange={handleGenderChange}
                        icon={ArrowIcon}
                        isSelect={true}
                        options={[
                            { value: 'man', label: 'Man' },
                            { value: 'woman', label: 'Woman' },
                        ]}
                    />
                </>)}
                <div className="text-red-500 mb-5">{signUpResult}</div>
            </div>

            <div className="mt-auto w-full">
                <ContinueButton text={"Continue"} onClick={handleContinue} disabled={!isContinueVisible} />
            </div>
        </div>
    );
};

export default SignUpPage;

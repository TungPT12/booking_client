import React, { useEffect, useState } from 'react';
import styles from './Register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import useInput from '../../hook/use-input';
import { isEmptyInput, isShowWarning, validPassword, validatePhoneNumber, validatedEmail } from '../../utils/input';
import { register } from '../../apis/user';
import alertMessage from '../../utils/warningMessage';

function Register() {
    const { isAuthn } = useSelector(state => state.authn)
    const [isDuplicateUserName, setIsDuplicateUserName] = useState(false);
    const [isDuplicateEmail, setIsDuplicateEmail] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthn) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthn])
    const {
        isValid: isValidFullName,
        input: inputFullName,
        isTouch: isTouchFullName,
        onTouched: onTouchedFullName,
        setInput: setInputFullName,
    } = useInput(isEmptyInput, '');
    const {
        isValid: isValidUserName,
        input: inputUserName,
        isTouch: isTouchUserName,
        onTouched: onTouchedUserName,
        setInput: setInputUserName,
    } = useInput(isEmptyInput, '');
    const {
        isValid: isValidPassword,
        input: inputPassword,
        isTouch: isTouchPassword,
        onTouched: onTouchedPassword,
        setInput: setInputPassword,
        resetInput: resetInputPassword
    } = useInput(validPassword, '');
    const {
        isValid: isValidEmail,
        input: inputEmail,
        isTouch: isTouchEmail,
        onTouched: onTouchedEmail,
        setInput: setInputEmail,
    } = useInput(validatedEmail, '');
    const {
        isValid: isValidPhoneNumber,
        input: inputPhoneNumber,
        isTouch: isTouchPhoneNumber,
        onTouched: onTouchedPhoneNumber,
        setInput: setInputPhoneNumber,
    } = useInput(validatePhoneNumber, '');

    const isValidSubmit = isValidFullName && isValidUserName && isValidPassword && isValidEmail && isValidPhoneNumber;

    const onSubmitRegister = (e) => {
        e.preventDefault();
        const user = {
            username: inputUserName.trim(),
            password: inputPassword.trim(),
            fullName: inputFullName.trim(),
            phoneNumber: inputPhoneNumber.trim(),
            email: inputEmail.trim(),
        }
        register(user).then((response) => {
            if (response.status !== 200) {
                setIsDuplicateEmail(false);
                setIsDuplicateUserName(false);
                if (response.data.message === "Duplicate User Name" || response.data.message === "Duplicate Email") {
                    console.log("sd")
                    if (response.data.message === "Duplicate User Name") {
                        setIsDuplicateUserName(true)
                    } else if (response.data.message === "Duplicate Email") {
                        setIsDuplicateEmail(true)
                    }
                    throw new Error(response.data.message);
                } else {
                    throw new Error(response.data.message);
                }

            }
            //  else {
            alert('Successfully')
            return;
            // }

        }).then(() => {
            navigate('/login')
        }).catch((error) => {
            console.log(error)
            // alert('Fail')
        })
    }

    return (
        <div className={`${styles['register-wrap']} d-flex flex-column`}>
            <div className='' style={{
                backgroundColor: "#003580"
            }}>
                <div className={`${styles['navbar-container']} container`}>
                    <Row className={`${styles['nav-bar_header']}`}>
                        <Col><Link className='text-decoration-none text-light' to="/"><h2 className={`${styles['nav-bar__header__brand']}`}>Booking Website</h2></Link></Col>
                        <Col className={`${styles[' nav-bar__header__action']} d-flex justify-content-end`}>
                            <Link to="/register" className={`${styles['button-navbar']} me-4 border-0 d-block bg-light text-decoration-none`}>Register</Link>
                            <Link to="/login" className={`${styles['button-navbar']} border-0 bg-light text-decoration-none`}>Login</Link>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className={`h-100 w-100 d-flex justify-content-center align-items-center flex-column`}>
                <h1 className='text-center'>Register</h1>
                <form onSubmit={isValidSubmit ? onSubmitRegister : (e) => {
                    e.preventDefault();
                    onTouchedUserName(true);
                    onTouchedEmail(true);
                    onTouchedFullName(true);
                    onTouchedPassword(true);
                    onTouchedPhoneNumber(true);
                }} className={`${styles['register-form']} d-flex flex-column`}>
                    <input value={inputUserName} onBlur={onTouchedUserName} onChange={(e) => {
                        setInputUserName(e.target.value)
                    }} type='text' className='w-100 px-3 py-3 my-2' placeholder="User Name" />
                    {isShowWarning(isValidUserName, isTouchUserName) ? alertMessage("Please enter user name!") : <></>}
                    {isDuplicateUserName ? alertMessage("This username has exist!") : <></>}
                    <input type='password' value={inputPassword} onBlur={onTouchedPassword} onChange={(e) => {
                        setInputPassword(e.target.value)
                    }} className='w-100 px-3 py-3 my-2' placeholder="Password" />
                    {isShowWarning(isValidPassword, isTouchPassword) ? alertMessage("Password must have at least 8 character!") : <></>}
                    <input type='email' onBlur={onTouchedEmail} value={inputEmail} onChange={(e) => {
                        setInputEmail(e.target.value)
                    }} className='w-100 px-3 py-3 my-2' placeholder="Email" />
                    {isShowWarning(isValidEmail, isTouchEmail) ? alertMessage("Please enter email (abc@gmai.abc)!") : <></>}
                    {isDuplicateEmail ? alertMessage("This email has exist!") : <></>}
                    <input type='phone' onBlur={onTouchedPhoneNumber} value={inputPhoneNumber} onChange={(e) => {
                        setInputPhoneNumber(e.target.value)
                    }} className='w-100 px-3 py-3 my-2' placeholder="Phone" />
                    {isShowWarning(isValidPhoneNumber, isTouchPhoneNumber) ? alertMessage("Please enter phone number and have 10 to 11 number!") : <></>}
                    <input type='text' value={inputFullName} onBlur={onTouchedFullName} onChange={(e) => {
                        setInputFullName(e.target.value)
                    }} className='w-100 px-3 py-3 my-2' placeholder="Full Name" />
                    {isShowWarning(isValidFullName, isTouchFullName) ? alertMessage("Please enter full name!") : <></>}
                    <button className={`${styles['register-action-btn']} mt-3 py-2 px-2`}>Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
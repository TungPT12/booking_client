import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authnAction } from '../../stores/slice/authn';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Login.module.css';
import { Col, Row } from 'react-bootstrap';
import { login } from '../../apis/authn';

function Login() {
    const { isAuthn } = useSelector(state => state.authn)
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [wrongUser, setWrongUser] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthn) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthn])

    const onSubmitLogin = async (e) => {
        try {
            e.preventDefault();
            const response = await login(username, password);
            if (response.status === 401) {
                setWrongUser(true);
                return;
            }
            if (response.status !== 200) {
                throw new Error(response.data.message);
            }
            const data = response.data;
            dispatch(authnAction.login(data));
            navigate('/')
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    return (
        <div className={`${styles['login-wrap']} d-flex flex-column`}>
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
                <h1 className='text-center'>Login</h1>
                {wrongUser ? <p>Wrong username or password</p> : <></>}
                <form onSubmit={onSubmitLogin} className={`${styles['login-form']} d-flex flex-column`}>
                    <input type='text' required onChange={(e) => {
                        setUserName(e.target.value)
                    }} className='w-100 px-3 py-3 my-2' placeholder="User Name" />
                    <input type='password' required onChange={(e) => {
                        setPassword(e.target.value)
                    }} className='w-100 px-3 py-3 my-2' placeholder="Password" />
                    <button className={`${styles['login-action-btn']} py-2 px-2`}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
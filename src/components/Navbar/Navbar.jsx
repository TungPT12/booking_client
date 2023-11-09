import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'react-bootstrap';
import './Navbar.css';
import navbarData from '../../data/navBar.json';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authnAction } from '../../stores/slice/authn';
function Navbar() {
    const { isAuthn, email } = useSelector(state => state.authn)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState('Stays');
    const renderNavBarData = () => {
        return navbarData.map((navbarObj) => {
            return <Link
                onClick={() => {
                    setActiveTab(navbarObj.type)
                }}
                className={`tab__item ${activeTab === navbarObj.type ? 'active' : ""}`}
                key={navbarObj.type}
                to='/'
                state={navbarObj.type}
            >
                <i className={`fa ${navbarObj.icon}`}></i>
                {navbarObj.type}
            </Link>
        })
    }

    const isLogin = () => {
        if (isAuthn) {
            navigate('/')
        }
    }

    const logout = () => {
        dispatch(authnAction.logout());
    }
    return (
        <div id="nav-bar">
            <div className="container">
                <Row className='nav-bar_header'>
                    <Col><Link className='text-decoration-none text-light' to="/"><h2 className='nav-bar__header__brand'>Booking Website</h2></Link></Col>
                    <Col className='nav-bar__header__action d-flex justify-content-end'>
                        {
                            isAuthn ?
                                <>
                                    <p className={`fw-500 me-4`}>{email}</p>
                                    <Link to="/transaction" className="button-navbar me-4 border-0 d-block bg-light text-decoration-none">Transaction</Link>
                                    <Link to="/login" onClick={logout} className="button-navbar border-0 bg-light text-decoration-none">Logout</Link>
                                </> :
                                <>
                                    <Link to="/register" className="button-navbar me-4 border-0 d-block bg-light text-decoration-none">Register</Link>
                                    <Link to="/login" onClick={() => {
                                        isLogin()
                                    }} className="button-navbar border-0 bg-light text-decoration-none">Login</Link>
                                </>
                        }
                    </Col>
                </Row>
                {isAuthn ? <div className='nav-bar_link d-flex'>
                    {renderNavBarData()}
                </div> : <></>}
            </div>
        </div>
    );
}

export default Navbar;
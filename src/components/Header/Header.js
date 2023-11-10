import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // t
import { useState } from 'react';
import { DateRange } from "react-date-range";
import { Link, useNavigate } from 'react-router-dom';
import { vi } from 'date-fns/locale'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const [openOptions, setOpenOptions] = useState(false);
    const [area, setArea] = useState('');
    const [maxPeople, setMaxPeople] = useState(0)
    // const [option, setOption] = useState({
    //     adult: 0,
    //     children: 0,
    //     quantityRoom: 0,
    // })
    const [activePickerTime, setActivePickerTime] = useState(false);
    const navigate = useNavigate();
    const { isAuthn } = useSelector(state => state.authn);
    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });
    const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    // const handleOption = (optionType, isIncrease) => {
    //     if (optionType === 'adult') {
    //         if (isIncrease) {
    //             setOption({
    //                 ...option,
    //                 adult: option.adult + 1
    //             })
    //         } else {
    //             setOption({
    //                 ...option,
    //                 adult: option.adult - 1
    //             })
    //         }
    //     } else if (optionType === 'children') {
    //         if (isIncrease) {
    //             setOption({
    //                 ...option,
    //                 children: option.children + 1
    //             })
    //         } else {
    //             setOption({
    //                 ...option,
    //                 children: option.children - 1
    //             })
    //         }
    //     } else {
    //         if (isIncrease) {
    //             setOption({
    //                 ...option,
    //                 quantityRoom: option.quantityRoom + 1
    //             })
    //         } else {
    //             setOption({
    //                 ...option,
    //                 quantityRoom: option.quantityRoom - 1
    //             })
    //         }
    //     }
    // }


    const handleMaxPeople = (isInCrease) => {
        if (isInCrease) {
            setMaxPeople(maxPeople + 1);
        } else {
            setMaxPeople(maxPeople - 1);
        }
    }


    const handleSearch = () => {
        navigate('/search', {
            state: {
                startDate: date.startDate,
                endDate: date.endDate,
                area: area,
                maxPeople: maxPeople
            }
        })
    }

    return (
        <div id="header" className=''>
            <div className="container">
                <h1 className='mb-4'>A life of discounts? It's Genius</h1>
                <p className='mb-3'>Get rewarded for your travels-unlock instant saving of 10% or more with a free account</p>
                {isAuthn ? <></> : <Link to="/login" className='header-button text-light border-0 h6 text-decoration-none'>Sign in / Register</Link>}
                <div className="search-form position-relative d-flex justify-content-center">
                    <div className='d-flex form'>
                        <div className='search-input__place f-1 d-flex align-items-center'>
                            <i className='fa fa-bed icon opacity-25'></i>
                            <input type='text' value={area} onChange={(e) => {
                                setArea(e.target.value)
                            }} className='w-100' placeholder="Where are you going?" />
                        </div>
                        <div className='picker-date position-relative f-1 d-flex text-black align-items-center'
                            onClick={() => {
                                setActivePickerTime(!activePickerTime);
                            }}
                        >
                            <i className='fa fa-calendar opacity-25 icon'></i>
                            <p className='picker-date__holder opacity-25'>{formatDate(date.startDate)}-{formatDate(date.endDate)}</p>
                            <div onClick={(e) => {
                                e.stopPropagation();
                            }}>
                                <DateRange
                                    locale={vi}
                                    months={2}
                                    editableDateInputs={true}
                                    className={`date position-absolute w-100 header__input-booking-day ${activePickerTime ? 'd-block' : 'd-none'}`}
                                    onChange={(item) => {
                                        setDate(item.selection)
                                    }}
                                    ranges={[date]}
                                    minDate={new Date()}
                                />
                            </div>
                        </div>
                        <div onClick={(e) => {
                            e.stopPropagation();
                            setOpenOptions(!openOptions)
                        }} className='picker-quantity f-1 d-flex text-black align-items-center position-relative'>
                            <FontAwesomeIcon icon={faPerson} className='opacity-25 icon me-2' />
                            {/* <i className='opacity-25 icon fa fa-female'></i> */}
                            <div className='d-flex'>
                                <p className='picker-quantity__holder opacity-25'>{maxPeople} people ·</p>
                                {/* <p className='picker-quantity__holder opacity-25'>{option.children} children ·</p> */}
                                {/* <p className='picker-quantity__holder opacity-25'>{option.quantityRoom} room</p> */}
                            </div>
                            {openOptions && (
                                <div className="options" onClick={(e) => {
                                    e.stopPropagation();
                                }}>
                                    <div className="optionItem">
                                        <span className="optionText">Adult</span>
                                        <div className="optionCounter">
                                            <button onClick={() => {
                                                handleMaxPeople(false)
                                            }} disabled={maxPeople <= 0} className="optionCounterButton">-</button>
                                            <span className="optionCounterNumber">{maxPeople}</span>
                                            <button onClick={() => {
                                                handleMaxPeople(true)
                                            }} className="optionCounterButton">+</button>
                                        </div>
                                    </div>
                                    {/* <div className="optionItem">
                                        <span className="optionText">Children</span>
                                        <div className="optionCounter">
                                            <button onClick={() => {
                                                handleOption('children', false)
                                            }} disabled={option.children <= 0} className="optionCounterButton">-</button>
                                            <span className="optionCounterNumber">{option.children}</span>
                                            <button onClick={() => {
                                                handleOption('children', true)
                                            }} className="optionCounterButton">+</button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Room</span>
                                        <div className="optionCounter">
                                            <button onClick={() => {
                                                handleOption('room', false)
                                            }} disabled={option.quantityRoom <= 0} className="optionCounterButton" >-</button>
                                            <span className="optionCounterNumber">{option.quantityRoom}</span>
                                            <button onClick={() => {
                                                handleOption('room', true)
                                            }} className="optionCounterButton">+ </button>
                                        </div>
                                    </div> */}
                                </div>
                            )}
                        </div>
                        <button onClick={handleSearch} className='search-button text-decoration-none'>Search</button>
                        {/* <button to="/search" state={{
                            startDate: date.startDate,
                            endDate: date.endDate
                        }} className='search-button text-decoration-none'>Search</button> */}
                    </div>
                </div>
            </div >
        </div >
    );
}

export default Header;



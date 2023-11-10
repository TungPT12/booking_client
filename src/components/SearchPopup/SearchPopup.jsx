import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './SearchPopup.module.css';
import './SubSearchPopup.css';
import { DateRange } from "react-date-range";
import { useState } from 'react';
import { format } from 'date-fns';

function SearchPopup({ date, setDate, setPeople, people, area, setArea, minPrice, setMinPrice, maxPrice, setMaxPrice, onHandleSearch }) {

    const [activePickerTime, setActivePickerTime] = useState(false);
    return (
        <div className={`px-3 pb-4 pt-4 ${styles['search-popup']} `}>
            <h3 className={`mb-1 ${styles['title-search-popup']}`}>Search</h3>
            <div className={`mb-3  ${styles['destination']}`}>
                <label className='mb-1 d-block'>Destination</label>
                <input type='text' value={area} onChange={(e) => {
                    setArea(e.target.value)
                }} className='pt-2 ps-2 pb-2' />
            </div>
            <div className={`mb-3 ${styles['checkin-date']}`}>
                <label className='mb-1 d-block'>Check-in Date</label>
                <div className={`${styles['picker-date']} w-100 bg-light position-relative d-flex text-black align-items-center`}
                    onClick={(e) => {
                        setActivePickerTime(!activePickerTime);
                    }}
                >
                    <p className={`${styles['picker-date__holder']}`}>{format(date.startDate, 'dd/MM/yyyy')} to {format(date.endDate, 'dd/MM/yyyy')}</p>
                    <div onClick={(e) => {
                        e.stopPropagation();
                    }}>
                        <DateRange
                            editableDateInputs={true}
                            moveRangeOnFirstSelection={true}
                            className={`date position-absolute w-100 search__popup__input-booking-day ${activePickerTime ? 'd-block' : 'd-none'}`}
                            onChange={(e) => {
                                setDate(e.selection);
                            }}
                            ranges={[date]}
                        />
                    </div>
                </div>
            </div>
            <div className={` mb-4 ${styles['search-popup__option']}`}>
                <label className={`mb-2`}>Options</label>
                <div className={`mx-3 ${styles['input-option']}`}>
                    <div className={`d-flex `}>
                        <span>Min price per night ($)</span>
                        <input type='number' step={1} min={0} value={minPrice} onChange={(e) => {
                            setMinPrice(e.target.value)
                        }} className="ps-1" />
                    </div>
                    <div className={`d-flex`}>
                        <span>Max price per night ($)</span>
                        <input type='number' step={1} min={0} value={maxPrice} onChange={(e) => {
                            setMaxPrice(e.target.value)
                        }} className={`ps-1`} />
                    </div>
                    <div className={`d-flex d-`}>
                        <span className='text-capitalize'>People</span>
                        <input type='number' className='ps-1' step={1} min={0} value={people} onChange={(e) => {
                            setPeople(e.target.value)
                        }} />
                    </div>
                    {/* <div className={`d-flex`}>
                        <span>Children</span>
                        <input type='number' />
                    </div>
                    <div className={`d-flex`}>
                        <span>Room</span>
                        <input type='number' />
                    </div> */}
                </div>
            </div>
            <button onClick={onHandleSearch} className={`w-100 pb-2 pt-2 ${styles['search-popup__button']}`}>Search</button>
        </div >
    );
}

export default SearchPopup;
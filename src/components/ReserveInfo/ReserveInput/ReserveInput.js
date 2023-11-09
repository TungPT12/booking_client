import React from 'react';
import styles from './ReserveInput.module.css'
import { isShowWarning } from '../../../utils/input';


function ReserveInput({ title, placeholder, isValid, input, isTouch, onTouched, setInput, msg }) {
    const alertMessage = (msg) => {
        return <div className="">
            {msg}
        </div>
    }
    return (
        <div className='mb-3'>
            <p className='mb-1'>{title} :</p>
            <input value={input} onBlur={onTouched} onChange={(e) => {
                setInput(e.target.value)
            }} className={`${styles['reserve-input']} w-100 p-2`} placeholder={placeholder} />
            {isShowWarning(isValid, isTouch) ? alertMessage(msg) : <></>}
        </div>
    );
}

export default ReserveInput;
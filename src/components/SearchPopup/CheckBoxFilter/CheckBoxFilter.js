import React from 'react';
import styles from './CheckBoxFilter.module.css';

function CheckBoxFilter() {
    return (
        <div className={`${styles['checkbox-filter']} ms-3 d-flex`}>
            <input type='checkbox' />
            <p>hotel</p>
        </div>
    );
}

export default CheckBoxFilter;
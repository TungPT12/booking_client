import React from 'react';
import CheckBoxFilter from '../CheckBoxFilter/CheckBoxFilter';
import styles from './CardFilter.module.css'

function CardFilter({ title }) {
    return (
        <div className={`${styles['card-filter']} pt-2 px-2 pb-2`}>
            <h6 className={`${styles['title']} fw-600`}>{title}</h6>
            <div>
                <CheckBoxFilter />
                <CheckBoxFilter />
                <CheckBoxFilter />
                <CheckBoxFilter />
                <CheckBoxFilter />
                <CheckBoxFilter />
            </div>
        </div>
    );
}

export default CardFilter;
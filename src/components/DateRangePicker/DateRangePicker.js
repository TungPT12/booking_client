import React from 'react';
import { DateRange } from 'react-date-range';
import { vi } from 'date-fns/locale';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // t
function DateRangePicker({ date, setDate }) {
    return (
        <DateRange
            locale={vi}
            onChange={(item) => {
                setDate(item.selection)
            }}
            minDate={new Date()}
            editableDateInputs={true}
            ranges={[date]}
            className='date'
        />
    );
}

export default DateRangePicker;
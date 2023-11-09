import React from 'react';
import ReserveInput from './ReserveInput/ReserveInput';

function ReserveInfo() {
    return (
        <div>
            <ReserveInput title="Your Full Name" placeholder="Full Name" />
            <ReserveInput title="Your Email" placeholder="Email" />
            <ReserveInput title="Your Phone Number" placeholder="Phone Number" />
            <ReserveInput title="Your Identity Card Number" placeholder="Card Number" />

        </div>
    );
}

export default ReserveInfo;
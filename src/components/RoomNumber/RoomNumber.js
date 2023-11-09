import React, { useEffect, useState } from 'react';

function RoomNumber({ roomNumber, price, roomId, title, handelRooms, startDate, endDate }) {
    const [checked, setChecked] = useState(false)
    useEffect(() => {
        setChecked(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate])
    return (
        <div className='d-flex flex-column me-2'>
            <span className='opacity-75'>{roomNumber}</span>
            <input type="checkbox" checked={checked} onChange={(e) => {
                setChecked(!checked)
                const room = {
                    price: price,
                    roomId: roomId,
                    // roomName: title,
                    roomNumber: roomNumber
                }
                handelRooms(room)
            }} />
        </div>
    );
}

export default RoomNumber;
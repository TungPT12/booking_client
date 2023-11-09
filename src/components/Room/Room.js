import React from 'react';
import styles from './Room.module.css';
import RoomNumber from '../RoomNumber/RoomNumber';

function Room({ id, title, price, maxPeople, roomNumbers, desc, roomsChoose, setRoomsChoose, setTotalPrice, totalPrice, startDate, endDate }) {
    
    // xử lý chọn phòng theo ngày và tính giá phòng
    const handelRooms = (room) => {
        const day = Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)) + 1;
        const position = roomsChoose.findIndex((roomChoose) => {
            return (roomChoose.roomId === room.roomId && roomChoose.roomNumber === room.roomNumber);
        });
        if (position > -1) {
            const tmpRoomsChoose = roomsChoose;
            const roomSplice = tmpRoomsChoose.splice(position, 1)[0];
            setRoomsChoose([...tmpRoomsChoose]);
            setTotalPrice(totalPrice - (roomSplice.price * day))
        } else {
            const priceRoom = price * day
            setRoomsChoose([...roomsChoose, room])
            setTotalPrice(totalPrice + priceRoom)
        }
    }

    // useEffect(() => {
    //     // setChecked(false);
    //     // const day = Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)) + 1;
    //     // const newTotalPrice = roomsChoose.reduce((totalPrice, room) => {
    //     //     return totalPrice + (room.price * day)
    //     // }, 0)
    //     // setTotalPrice(newTotalPrice)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [startDate, endDate])


    // const renderRoomNumbers = (roomNumbers) => {
    //     return roomNumbers.map((roomNumber) => {
    //         return <div className='d-flex flex-column me-2'>
    //             <span className='opacity-75'>{roomNumber}</span>
    //             <input type="checkbox" checked={checked} onChange={(e) => {
    //                 setChecked(!checked)
    //                 const room = {
    //                     price: price,
    //                     roomId: id,
    //                     roomName: title,
    //                     roomNumber: roomNumber
    //                 }
    //                 handelRooms(room)
    //             }} />
    //         </div>
    //     })
    // }

    const renderRoomNumbers = (roomNumbers) => {
        return roomNumbers.map((roomNumber) => {
            return <RoomNumber
                roomNumber={roomNumber}
                price={price}
                roomId={id}
                title={title}
                handelRooms={handelRooms}
                startDate={startDate}
                endDate={endDate}
            />
        })
    }
    return (
        <div>
            <p className={`${styles['room-title']}`}>{title}</p>
            <div className='d-flex f-1'>
                <div className='f-3'>
                    <p className={`${styles['room-description']}`}>{desc}</p>
                    <p className={`${styles['quantity-people']}`}>Max people: <span className={`${styles['room-number-quantity']}`}>{maxPeople}</span></p>
                    <p className={`${styles['room-price']}`}>${price}</p>
                </div>
                <div className={` ${styles['room-numbers']} fa-1x`}>
                    {renderRoomNumbers(roomNumbers)}
                </div>
            </div>

        </div>
    );
}

export default Room;
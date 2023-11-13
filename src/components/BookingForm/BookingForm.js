import React, { useEffect, useState } from 'react';
import styles from './BookingForm.module.css';
import DateRangePicker from '../DateRangePicker/DateRangePicker';
import ReserveInput from '../ReserveInfo/ReserveInput/ReserveInput';
import useInput from '../../hook/use-input';
import { isEmptyInput, isEmptySelect, isShowWarning, validatePhoneNumber, validateVisa, validatedEmail } from '../../utils/input';
import Room from '../Room/Room';
import { createTransactionApi } from '../../apis/transaction';
import { useNavigate } from 'react-router-dom';
import { getRoomByHotelId } from '../../apis/room';
import { useDispatch, useSelector } from 'react-redux';
import { authnAction } from '../../stores/slice/authn';
import alertMessage from '../../utils/warningMessage';

function BookingForm({ email, fullName, phoneNumber, username, hotelId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector(state => state.authn);
    const [rooms, setRooms] = useState([]); // dữ liệu phòng show cho user
    const [roomsChoose, setRoomsChoose] = useState([])// cac phong duojc chon
    const [totalPrice, setTotalPrice] = useState(0)
    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })
    const {
        isValid: isValidFullName,
        input: inputFullName,
        isTouch: isTouchFullName,
        onTouched: onTouchedFullName,
        setInput: setInputFullName,
    } = useInput(isEmptyInput, fullName);

    const {
        isValid: isValidEmail,
        input: inputEmail,
        isTouch: isTouchEmail,
        onTouched: onTouchedEmail,
        setInput: setInputEmail,
    } = useInput(validatedEmail, email);
    const {
        isValid: isValidPhoneNumber,
        input: inputPhoneNumber,
        isTouch: isTouchPhoneNumber,
        onTouched: onTouchedPhoneNumber,
        setInput: setInputPhoneNumber,
    } = useInput(validatePhoneNumber, phoneNumber);
    const {
        isValid: isValidCardNumber,
        input: inputCardNumber,
        isTouch: isTouchCardNumber,
        onTouched: onTouchedCardNumber,
        setInput: setInputCardNumber,
    } = useInput(validateVisa, '');

    const {
        isValid: isValidPayment,
        input: inputPayment,
        isTouch: isTouchPayment,
        onTouched: onTouchedPayment,
        setInput: setInputPayment,
    } = useInput(isEmptySelect, 'none');

    // lấy dữ liệu room từ database
    const loadRoomData = async (hotelId, startDate, endDate) => {
        try {
            const response = await getRoomByHotelId(token, hotelId, startDate, endDate);
            if (response.status !== 200) {
                throw new Error(response.data.message);
            }
            const rooms = response.data;
            setRooms(rooms);
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        loadRoomData(hotelId, date.startDate, date.endDate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date.endDate, date.startDate])

    const renderRooms = (rooms) => {
        return rooms.map((room) => {
            return <div className={`${styles['wrapper-room']}`}>
                <Room
                    startDate={date.startDate}
                    endDate={date.endDate}
                    id={room._id}
                    title={room.title}
                    price={room.price}
                    maxPeople={room.maxPeople}
                    roomNumbers={room.roomNumbers}
                    desc={room.desc}
                    roomsChoose={roomsChoose}
                    setRoomsChoose={setRoomsChoose}
                    totalPrice={totalPrice}
                    setTotalPrice={setTotalPrice}
                />
            </div>
        })
    }

    const isValidSubmit = isValidFullName && isValidCardNumber && isValidEmail && isValidPhoneNumber && isValidPayment;

    useEffect(() => {
        setTotalPrice(0)
        setRoomsChoose([])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date])

    const onSubmitReverse = () => {
        const rooms = roomsChoose.map((room) => {
            return room.roomNumber
            // return {
            //     roomId: room.roomId,
            //     roomName: room.roomName,
            //     roomNumber: room.roomNumber
            // }
        })
        const transaction = {
            username: username,
            fullName: inputFullName,
            rooms: rooms,
            dateStart: date.startDate,
            dateEnd: date.endDate,
            price: totalPrice,
            payment: inputPayment,
            hotelId: hotelId,
            // userId: userId
        }
        createTransactionApi(token, transaction).then((response) => {
            if (response.status === 403 || response.status === 401) {
                localStorage.removeItem('bookingToken');
                dispatch(authnAction.logout())
                navigate('/login')
            }
            if (response.status !== 200) {
                throw new Error(response.data.message);
            }
            alert('Successfully')
            navigate('/transaction')
        }).catch((error) => {
            console.log(error)
            alert('Fail')
        })
    }

    return (
        <main className='container'>
            <div className='d-flex'>
                <div className='f-1'>
                    <h3>Date</h3>
                    <div>
                        <DateRangePicker
                            className={`position-relative`}
                            date={date}
                            setDate={setDate}
                        />
                    </div>
                </div>
                <div className='f-2'>
                    <h3>Reserve Info</h3>
                    <div>
                        <ReserveInput
                            startDate={date.startDate}
                            endDate={date.endDate}
                            title="Your Full Name"
                            placeholder="Full Name"
                            isValid={isValidFullName}
                            input={inputFullName}
                            isTouch={isTouchFullName}
                            onTouched={onTouchedFullName}
                            setInput={setInputFullName}
                            msg="Please enter your full name"
                        />
                        <ReserveInput
                            startDate={date.startDate}
                            endDate={date.endDate}
                            title="Your Email"
                            placeholder="Email"
                            isValid={isValidEmail}
                            input={inputEmail}
                            isTouch={isTouchEmail}
                            onTouched={onTouchedEmail}
                            setInput={setInputEmail}
                            msg="Please enter your email!"
                        />
                        <ReserveInput
                            startDate={date.startDate}
                            endDate={date.endDate}
                            title="Your Phone Number"
                            placeholder="Phone Number"
                            isValid={isValidPhoneNumber}
                            input={inputPhoneNumber}
                            isTouch={isTouchPhoneNumber}
                            onTouched={onTouchedPhoneNumber}
                            setInput={setInputPhoneNumber}
                            msg="Please enter your phone number!"
                        />
                        <ReserveInput
                            startDate={date.startDate}
                            endDate={date.endDate}
                            title="Your Identity Card Number"
                            placeholder="Card Number"
                            isValid={isValidCardNumber}
                            input={inputCardNumber}
                            isTouch={isTouchCardNumber}
                            onTouched={onTouchedCardNumber}
                            setInput={setInputCardNumber}
                            msg="Card number is invalid!"
                        />

                    </div>
                </div>
            </div>
            <div>
                <h3>Select Rooms</h3>
                {
                    rooms.length > 0 ?
                        <div>
                            <div className={` ${styles['rooms']} d-grid`}>
                                {rooms ? renderRooms(rooms) : <></>}
                            </div>
                            <div className="mt-3">
                                <h3>Total Bill: ${totalPrice}</h3>
                                <div className='d-flex align-items-center'>
                                    <div className='d-flex flex-column'>
                                        <select onBlur={onTouchedPayment} value={inputPayment} onChange={(e) => {
                                            setInputPayment(e.target.value)
                                        }} className='h-100'>
                                            <option>Select Payment Method</option>
                                            <option>Cash</option>
                                            <option>Credit Card</option>
                                        </select>
                                        {isShowWarning(isValidPayment, isTouchPayment) ? alertMessage("Please enter type!") : <></>}
                                    </div>
                                    <button onClick={isValidSubmit ? onSubmitReverse : () => {
                                        onTouchedCardNumber();
                                        onTouchedPayment();
                                        onTouchedEmail();
                                        onTouchedPhoneNumber();
                                        onTouchedFullName();
                                    }} className={`book-btn ${styles['reserve-btn-form']} d-block text-center`}
                                        style={{
                                            padding: '1rem 3rem',
                                            fontSize: '1.2rem',
                                        }}
                                    >Reserve Now!</button>
                                </div>
                            </div>
                        </div> :
                        <h1>
                            We are update rooms
                        </h1>
                }
            </div>
        </main>
    );
}

export default BookingForm;
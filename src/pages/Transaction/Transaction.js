import React, { useCallback, useEffect, useState } from 'react';
import styles from './Transaction.module.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTransactionsApi } from '../../apis/transaction';
import { format } from 'date-fns'
import TagTransaction from '../../../components/TagTransaction/TagTransaction';

function Transaction() {
    const navigate = useNavigate();
    const { token } = useSelector(state => state.authn)
    const { isAuthn } = useSelector(state => state.authn);
    const [transactions, setTransactions] = useState([])
    useEffect(() => {
        if (!isAuthn) {
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthn])

    const renderRoomNumber = useCallback((roomNumbers) => {
        return roomNumbers.map((roomNumber, index) => {
            if (index === roomNumbers.length - 1) {
                return roomNumber;
            }
            return roomNumber + ', '
        })
    }, [])
    useEffect(() => {
        getTransactionsApi(token).then((response) => {
            if (response.status === 403 || response.status === 401) {
                localStorage.removeItem('bookingToken');
                window.location.href = `${window.location.protocol}//${window.location.hostname}:3000/login`
            }
            if (response.status !== 200) {
                throw new Error(response.data.message);
            }
            setTransactions(response.data)
        }).catch((error) => {
            console.log(error);
            alert(error.message);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const renderTransactions = () => {
        return transactions.map((transaction, index) => {
            if (index % 2 === 0) {
                return <tr className={`${styles['event-row']}  d-flex w-100`}>
                    <td className='f-1 d-flex justify-content-center'>{index + 1}</td>
                    <td className='f-6 overflow-hidden white-space-nowrap text-overflow-ellipsis'>
                        <p className='py-1'>{transaction.hotelId.name}</p>
                    </td>
                    <td className='f-2 line-height-22px'>{renderRoomNumber(transaction.rooms)}</td>
                    <td className='f-5'>{format(new Date(transaction.dateStart), 'dd/MM/yyyy')} - {format(new Date(transaction.dateEnd), 'dd/MM/yyyy')}</td>
                    <td className='f-2'>${transaction.price}</td>
                    <td className='f-3'>{transaction.payment}</td>
                    <td className='f-2'>
                        <TagTransaction
                            title={transaction.status.toLowerCase()}
                        />
                    </td>
                </tr>
            }
            return <tr className='d-flex w-100'>
                <td className='f-1 d-flex justify-content-center'>{index + 1}</td>
                <td className='f-6 overflow-hidden white-space-nowrap text-overflow-ellipsis'>
                    <p className='py-1'>{transaction.hotelId.name}</p>
                </td>
                <td className='f-2 line-height-22px'>{renderRoomNumber(transaction.rooms)}</td>
                <td className='f-5'>{format(new Date(transaction.dateStart), 'dd/MM/yyyy')} - {format(new Date(transaction.dateEnd), 'dd/MM/yyyy')}</td>
                <td className='f-2'>${transaction.price}</td>
                <td className='f-3'>{transaction.payment}</td>
                <td className='f-2'>
                    <TagTransaction
                        title={transaction.status.toLowerCase()}
                    />
                </td>
            </tr>
        })
    }
    return (
        <div className={`${styles['transaction']} container`}>
            <table className='w-100'>
                <tr className='d-flex w-100'>
                    <th className='f-1 d-flex justify-content-center'>#</th>
                    <th className='f-6'>Hotel</th>
                    <th className='f-2'>Room</th>
                    <th className='f-5'>Date</th>
                    <th className='f-2'>Price</th>
                    <th className='f-3'>Payment Method</th>
                    <th className='f-2'>Status</th>
                </tr>
                {renderTransactions()}
            </table>
        </div>
    );
}

export default Transaction;
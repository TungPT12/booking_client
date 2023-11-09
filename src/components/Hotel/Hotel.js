import React from 'react';
import styles from './Hotel.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Hotel({ data, setIsBooking }) {

    const { isAuthn } = useSelector(state => state.authn);
    const navigate = useNavigate();

    const renderDetailDataImg = (imgs) => {
        return imgs.map((img) => {
            return <img key={img} src={img} className='w-100' alt="Hotel" />
        })
    }

    return (
        <>
            <div className="d-flex justify-content-between">
                <div className='title'>
                    <h3 className="fw-700">{data.name}</h3>
                    <p className={`mb-2 ${styles['address']}`}>
                        <i className="me-2">
                            <FontAwesomeIcon icon={faLocationDot} />
                        </i>
                        {data.address}
                    </p>
                    <p className="text-primary opacity-75 fw-500 mb-2">Location - {data.distance}</p>
                </div>
                <button className="w-auto h-25 book-btn">Reserve or Book Now!</button>
            </div>
            <div className={` ${styles['grid__image']} d-grid grid-image gap-2 `}>
                {renderDetailDataImg(data.photos)}
            </div>
            <div className="d-flex mt-5" >
                <div className='flex-4 me-3'>
                    <h3 className="fw-700">{data.title}</h3>
                    <p className={`${styles['description']}`}>{data.desc}</p>
                </div>
                <div className={`${styles['price__info']} f-1 p-3`}>
                    <h5 className={`${styles['price__info__title']} fw-700 opacity-75 mb-3`}>Perfect for every night stay!</h5>
                    <p className='mb-3'>Located in the real heart of {data.area.name}, this property has an location score of {data.rating}</p>
                    {/* <div className={`${styles['price__info__price']} mb-3 d-flex`}><p className='fw-700 me-2'>${data.price * 9}</p> (9 nights)</div> */}
                    <button onClick={() => {
                        if (!isAuthn) {
                            navigate('/login')
                        }
                        setIsBooking(true)
                    }} className="f-1 book-btn w-100 d-block text-center h-fit-content">Reserve or Book Now!</button>
                </div>
            </div>
        </>
    );
}

export default Hotel;
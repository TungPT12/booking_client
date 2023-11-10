import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './SearchCard.module.css';
import { Link } from 'react-router-dom';

function SearchCard({ id, name, image, distance, type, rating, price }) {
    return (
        <div className={`d-flex p-2 ${styles['search-card']}`}>
            <div className={`${styles['search-card__img']}`}>
                <img src={image} alt={name} className='w-100 h-100' />
            </div>
            <div className={`d-flex ms-3 ${styles['search-card__info']}`}>
                <div style={{
                    flex: 2
                }}>
                    <div className={`${styles['title']}`}>
                        <h5 className={`mb-2 ${styles['hotel-name']}`}>{name}</h5>
                        <p className={`mb-2 font-size-14px`}>{distance} from center</p>
                        <p className={`mb-2 ${styles['description']} font-size-16px`}>{type}</p>
                    </div>
                    <div>
                        <p className={`mb-2 text-success ${styles['free-cancel-tag']} font-size-14px`}>Free cancellation</p>
                        <p className={`text-success ${styles['cancel-msg']} font-size-14px`}>You can cancel later, so lock  this great spanrice today</p>
                    </div>
                </div>
                <div className={`d-flex flex-column justify-content-between ms-3`} style={{
                    flex: 1
                }}>
                    <div className={`d-flex justify-content-end ${styles['rating']}`}>
                        <span className={`${styles['rating-number']}`}>{rating}</span>
                    </div>

                    <div className={`d-flex flex-column align-items-end ${styles['price']}`}>
                        {/* <p className='h4'>${price}</p> */}
                        <span className={`d-block opacity-75 mb-1`}>includes taxes and fees</span>
                        <Link to={`/detail/${id}`} className={`border-0 text-light w-100 text-center text-decoration-none ${styles['availability-button']}`}>See availability</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchCard;
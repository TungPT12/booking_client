import 'bootstrap/dist/css/bootstrap.min.css';
import './CardGuest.css'
import { Link } from 'react-router-dom';
function CardGuest({ id, name, area, rating, image }) {
    return (
        <div id="card-guest">
            <div>
                <img src={image} alt={name} />
                <div className="card__info">
                    <Link to={`/detail/${id}`} state={
                        {
                            name: name,
                            price: 100,
                            rate__text: 'tung'
                        }
                    } className="card__info__name d-block mb-2" >{name}</Link>
                    {/* <Link to={`/detail/}`} className="card__info__name d-block mb-2" >{props.name}</Link> */}
                    <p className="card__info__city mb-2">{area}</p>
                    {/* <p className="card__info__price mb-2 ">Starting from ${props.price}</p> */}
                    <div className='d-flex card__info__rating'>
                        <p className="rating-number px-3 py-1">{rating}</p>
                        {/* <p className="rating-type">ex</p> */}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CardGuest;
import 'bootstrap/dist/css/bootstrap.min.css';
import './Card.css'

function Card({ typeClass, name, subText, image }) {

    return (
        <div id="card"  >
            <div className={`position-relative ${typeClass} h-100`}>
                <img src={image} alt={name} />
                <div className="card__content">
                    <p className="card__title">{name}</p>
                    <p className="card__sub-text">{subText}</p>
                </div>
            </div>
        </div >
    );
}

export default Card;
import 'bootstrap/dist/css/bootstrap.min.css';
import './Card.css'
import { useEffect, useState } from 'react';

function Card({ typeClass, id, callback }) {
    const [data, setData] = useState({
        name: '',
        subText: '',
        image: '',
    })
    useEffect(() => {
        if (callback) {
            callback(id).then((data) => {
                setData(data)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div id="card"  >
            <div className={`position-relative ${typeClass} h-100`}>
                <img src={data.image} alt={data.name} />
                <div className="card__content">
                    <p className="card__title">{data.name}</p>
                    <p className="card__sub-text">{data.subText}</p>
                </div>
            </div>
        </div >
    );
}

export default Card;
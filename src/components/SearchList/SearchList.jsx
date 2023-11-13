import 'bootstrap/dist/css/bootstrap.min.css';
import SearchCard from '../SearchCard/SearchCard';
import styles from './SearchList.module.css'

function SearchList({ hotels }) {
    const renderSearchData = (hotels) => {
        return hotels.map((hotel) => {
            return <SearchCard
                id={hotel._id}
                key={hotel._id}
                description={hotel.desc}
                distance={hotel.distance}
                image={hotel.photos[0]}
                name={hotel.name}
                rating={hotel.rating}
                type={hotel.type.name}
            />
        })
    }

    return (
        <div className={`${styles['search-list']} d-flex flex-column`}>
            {renderSearchData(hotels)}
        </div>
    );
}

export default SearchList;
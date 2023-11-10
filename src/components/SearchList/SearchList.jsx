import 'bootstrap/dist/css/bootstrap.min.css';
import SearchCard from '../SearchCard/SearchCard';

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
        <div>
            {renderSearchData(hotels)}
        </div>
    );
}

export default SearchList;
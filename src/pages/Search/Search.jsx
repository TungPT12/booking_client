import SignupForm from '../../components/SignupForm/SubscribeForm';
import Footer from '../../components/Footer/Footer';
import SearchPopup from '../../components/SearchPopup/SearchPopup';
import SearchList from '../../components/SearchList/SearchList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Search.css'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { searchHotels } from '../../apis/hotel';
const Search = () => {
  const { state } = useLocation();
  const [date, setDate] = useState({
    startDate: state.startDate ? state.startDate : new Date(),
    endDate: state.endDate ? state.endDate : new Date(),
    key: 'selection',
  })
  const [area, setArea] = useState(state.area ? state.area : "");
  const [people, setPeople] = useState(state.maxPeople ? state.maxPeople : 0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [hotels, setHotels] = useState([])

  const onHandleSearch = () => {
    searchHotels({
      startDate: date.startDate,
      endDate: date.endDate,
      area: area,
      minPrice: minPrice,
      maxPrice: maxPrice,
      people: people
    }).then((response) => {
      setHotels(response.data)
    }).catch((error) => {
      console.log(error.message);
    })
  }

  useEffect(() => {
    onHandleSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div>
      <div id="search">
        <div className='container d-flex'>
          <SearchPopup
            date={date}
            setDate={setDate}
            area={area}
            setArea={setArea}
            people={people}
            setPeople={setPeople}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            onHandleSearch={onHandleSearch}
          />
          <div className={`ms-4 font-size-14px f-3 d-flex flex-column gap-3`}>
            {hotels.length > 0 ? <SearchList hotels={hotels} /> : <></>}
          </div>
        </div>
      </div>
      <SignupForm />
      <Footer />
    </div>
  );
};

export default Search;

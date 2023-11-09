import SignupForm from '../../components/SignupForm/SubscribeForm';
import Footer from '../../components/Footer/Footer';
import SearchPopup from '../../components/SearchPopup/SearchPopup';
import SearchList from '../../components/SearchList/SearchList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Search.css'
import search from '../../data/search.json';
const Search = (props) => {
  return (
    <div>
      <div id="search">
        <div className='container d-flex'>
          <SearchPopup />
          <SearchList searchData={search} />
        </div>
      </div>
      <SignupForm />
      <Footer />
    </div>
  );
};

export default Search;

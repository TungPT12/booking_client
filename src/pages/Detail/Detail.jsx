import SignupForm from '../../components/SignupForm/SubscribeForm';
import Footer from '../../components/Footer/Footer';
import './Detail.css';
import { useParams } from 'react-router-dom';
import BookingForm from '../../components/BookingForm/BookingForm';
import { useEffect, useState } from 'react';
import Hotel from '../../components/Hotel/Hotel';
import { useSelector } from 'react-redux';
import { getHotelByIdApi } from '../../apis/hotel';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const Detail = () => {
  const { id } = useParams();
  const { token } = useSelector(state => state.authn)
  const [isBooking, setIsBooking] = useState(false);
  const { email, fullName, phoneNumber, username } = useSelector(state => state.authn)
  const [hotelData, setHotelData] = useState(null);
  const [roomsData, setRoomsData] = useState(null);
  const [isLoadingHotel, setIsLoadingHotel] = useState(true);
  const loadHotelData = async (id) => {
    try {
      const response = await getHotelByIdApi(token, id);
      if (response.status !== 200) {
        throw new Error(response.data.message);
      }
      const hotel = response.data;
      const rooms = response.data.rooms;
      setHotelData({
        name: hotel.name,
        address: hotel.address,
        desc: hotel.desc,
        title: hotel.title,
        photos: hotel.photos,
        distance: hotel.distance,
        area: hotel.area,
        rating: hotel.rating
      });
      setRoomsData(rooms)
      setIsLoadingHotel(false)
    } catch (error) {
      console.log(error.message)
    }
  }


  useEffect(() => {
    window.scrollTo(0, 0);
    loadHotelData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div id="detail" className='mt-3'>
        {
          isLoadingHotel ? <LoadingSpinner /> : <div className='container'>
            {hotelData ? <Hotel
              data={hotelData}
              setIsBooking={setIsBooking}
            /> : <></>}
          </div>
        }
        {isBooking ?
          <BookingForm
            hotelId={id}
            email={email ? email : ""}
            fullName={fullName ? fullName : ""}
            username={username ? username : ""}
            phoneNumber={phoneNumber ? phoneNumber : ""}
            rooms={roomsData}
          /> : <></>}
      </div>
      <SignupForm />
      <Footer />
    </div>
  );
};

export default Detail;

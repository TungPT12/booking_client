import SignupForm from '../../../components/client/SignupForm/SubscribeForm';
import Footer from '../../../components/client/Footer/Footer';
import './Detail.css';
import { useParams } from 'react-router-dom';
import BookingForm from '../../../components/client/BookingForm/BookingForm';
import { useEffect, useState } from 'react';
import Hotel from '../../../components/client/Hotel/Hotel';
import { useSelector } from 'react-redux';
import { getHotelByIdApi } from '../../apis/hotel';

const Detail = () => {
  const { id } = useParams();
  const { token } = useSelector(state => state.authn)
  const [isBooking, setIsBooking] = useState(false);
  const { email, fullName, phoneNumber, username } = useSelector(state => state.authn)
  const [hotelData, setHotelData] = useState(null);
  const [roomsData, setRoomsData] = useState(null);
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
        <div className='container'>
          {hotelData ? <Hotel
            data={hotelData}
            setIsBooking={setIsBooking}
          /> : <></>}
        </div>
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

import Header from '../../components/Header/Header';
import CardGuest from '../../components/CardGuest/CardGuest';
import SignupForm from '../../components/SignupForm/SubscribeForm';
import Footer from '../../components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

import Card from '../../components/Card/Card';
import { getNumberHotelInRandomAreaApi } from '../../apis/area';
import { getNumberHotelByTypeApi } from '../../apis/type';
import { useEffect, useState } from 'react';
import { getTopThreeRatingHotel } from '../../apis/hotel';

const Home = () => {
	const [countHotelInThreeArea, setCountHotelInThreeArea] = useState([])
	const [numberHotelsByType, setNumberHotelsByType] = useState([])

	const getCountHotelInThreeRandomArea = () => {
		getNumberHotelInRandomAreaApi().then((response) => {
			if (response.status !== 200) {
				throw new Error(response.data.message);
			}
			setCountHotelInThreeArea(response.data)
		}).catch(() => {
			alert()
		})
	}
	const getNumberHotelByType = () => {
		getNumberHotelByTypeApi().then((response) => {
			if (response.status !== 200) {
				throw new Error(response.data.message);
			}
			setNumberHotelsByType(response.data)
		}).catch(() => {
			alert()
		})
	}

	const loadTopThreeRatingHotels = () => {
		getTopThreeRatingHotel().then((response) => {
			if (response.status !== 200) {
				throw new Error(response.data.message);
			}
			return response.data;
		}).then((data) => {
			setTopThreeRatingHotel(data);
		}).catch((error) => {
			console.log(error.message)
		})
	}

	useEffect(() => {
		getCountHotelInThreeRandomArea();
		getNumberHotelByType();
		loadTopThreeRatingHotels();
		window.scrollTo(0, 0)
	}, [])

	const [topThreeRatingHotel, setTopThreeRatingHotel] = useState([])



	const renderAreaCard = (listData, typeClass) => {
		return listData.map((data) => {
			return <Card
				key={data._id}
				id={data._id}
				name={data.name}
				subText={`${data.numberHotels} properties`}
				image={data.backgroundImage}
				typeClass={typeClass}
			/>
		})
	}

	const renderTypeCard = (listData, typeClass) => {
		return listData.map((data) => {
			return <Card
				key={data._id}
				id={data._id}
				name={data.name}
				subText={`${data.numberHotels} ${data.name.toLowerCase()}`}
				image={data.image}
				typeClass={typeClass}
			/>
		})
	}

	const renderTopThreeRatingHotel = (hotels) => {
		return hotels.map((hotel) => {
			return <CardGuest
				key={hotel._id}
				id={hotel._id}
				name={hotel.name}
				area={hotel.area.name}
				rating={hotel.rating}
				image={hotel.photos[0]}
			/>
		});

	}

	return (
		<div>
			<Header />
			<div id='home'>
				<div className='container'>
					<div className='city-card d-flex justify-content-between'>
						{renderAreaCard(countHotelInThreeArea, "city-type")}
					</div>
					<div className='list-hotel'>
						<h4 className='title'>Browse by property type</h4>
						<div className='gap-4 d-flex' >
							{renderTypeCard(numberHotelsByType, "other-type")}
						</div>
					</div>
					<div>
						<h4 className='title'>Homes guests love</h4>
						<div className='gap-4 d-flex'>
							{renderTopThreeRatingHotel(topThreeRatingHotel)}
						</div>
					</div>
				</div>
			</div>
			<SignupForm />
			<Footer />
		</div>
	);
};

export default Home;

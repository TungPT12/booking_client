import Header from '../../components/Header/Header';
import CardGuest from '../../components/CardGuest/CardGuest';
import SignupForm from '../../components/SignupForm/SubscribeForm';
import Footer from '../../components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

import Card from '../../components/Card/Card';
import { getNumberHotelInAreaApi } from '../../apis/area';
import { getNumberHotelByTypeApi } from '../../apis/type';
import { useEffect, useState } from 'react';
import { getTopThreeRatingHotel } from '../../apis/hotel';
import { useSelector } from 'react-redux';

const Home = () => {
	const { token } = useSelector(state => state.authn)
	const types = [
		'6544b205445f1e0af183c117',
		'6544c0d87eebdd077e6a7266',
		'6544c1517eebdd077e6a7269',
		'6544c1767eebdd077e6a726b',
		'6544c1917eebdd077e6a726d'
	]

	const areas = ['653714deedb62697ff304487', '654a3aa47cae0f6a21494517', '654a3bbb739f0ff8f0bbfd69'];

	const [topThreeRatingHotel, setTopThreeRatingHotel] = useState([])

	window.scrollTo(0, 0)


	const loadNumberHotelInArea = async (areaId) => {
		try {
			const response = await getNumberHotelInAreaApi(token, areaId);
			if (response.status !== 200) {
				throw new Error(response.data.message);
			}
			const area = response.data;
			const data = {
				name: area.name,
				subText: `${area.numberHotels} properties`,
				image: area.backgroundImage
			}
			return data
		} catch (error) {
			console.log(error.message)
		}
	}
	const loadNumberHotelByType = async (typeId) => {
		try {
			const response = await getNumberHotelByTypeApi(token, typeId);
			if (response.status !== 200) {
				throw new Error(response.data.message);
			}
			const area = response.data;
			const data = {
				name: area.name,
				subText: `${area.numberHotels} ${area.name.trim()} `,
				image: area.image
			}
			return data
		} catch (error) {
			console.log(error.message)
		}

	}

	const renderCard = (listData, callback, typeClass) => {
		return listData.map((id) => {
			return <Card
				key={id}
				callback={callback}
				id={id}
				typeClass={typeClass}
			/>
		})
	}

	useEffect(() => {
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
	}, [])


	const renderSuggestHotel = (hotels) => {
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
						{renderCard(areas, loadNumberHotelInArea, "city-type")}
					</div>
					<div className='list-hotel'>
						<h4 className='title'>Browse by property type</h4>
						<div className='gap-4 d-flex' >
							{renderCard(types, loadNumberHotelByType, "other-type")}
						</div>
					</div>
					<div>
						<h4 className='title'>Homes guests love</h4>
						<div className='gap-4 d-flex'>
							{renderSuggestHotel(topThreeRatingHotel)}
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

import Carousel from 'react-material-ui-carousel';
import { useAppSelector } from '../../app/hooks';
import AdItem from '../../components/AdItem';

const AdsCarousel = () => {
	const adItems = useAppSelector((state) => state.adsCarousel.value);

	return (
		<Carousel
			sx={{ m: '20px' }}
			indicatorContainerProps={{ style: { marginTop: 0 } }}
			navButtonsWrapperProps={{
				style: { bottom: '20px', top: 'unset' },
			}}
		>
			{adItems.map(({ id, image }) => (
				<AdItem key={id} image={image} />
			))}
		</Carousel>
	);
};

export default AdsCarousel;

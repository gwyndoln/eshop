import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Carousel from 'react-material-ui-carousel';
import { useAppSelector } from '../app/hooks';
import CategoryCard from '../features/CategoryCards/CategoryCard';
import AdsCarouselItem from '../features/AdsCarousel/AdsCarouselItem';
import Footer from './Footer';

const Home = () => {
	const adItems = useAppSelector((state) => state.adsCarousel.value);
	const categoryItems = useAppSelector((state) => state.categoryCards.value);

	return (
		<>
			<Container component="main" sx={{ mt: '1em' }} maxWidth="xl">
				<Carousel navButtonsAlwaysInvisible>
					{adItems.map(({ id, image }) => (
						<AdsCarouselItem key={id} image={image} />
					))}
				</Carousel>
				<Grid container spacing={2} sx={{ mt: '20px', mb: '50px' }}>
					{categoryItems.map(({ id, image, cardTitle, urlTitle }) => (
						<CategoryCard
							key={id}
							image={image}
							cardTitle={cardTitle}
							urlTitle={urlTitle}
						/>
					))}
				</Grid>
				<Divider />
			</Container>
			<Footer />
		</>
	);
};

export default Home;

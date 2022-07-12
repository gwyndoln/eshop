import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import Carousel from 'react-material-ui-carousel';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useAppSelector } from '../app/hooks';
import Header from './Header';
import CategoryCard from '../features/CategoryCards/CategoryCard';
import AdsCarouselItem from '../features/AdsCarousel/AdsCarouselItem';

const Home = () => {
	const adItems = useAppSelector((state) => state.adsCarousel.value);
	const categoryItems = useAppSelector((state) => state.categoryCards.value);

	const List = styled('ul')(() => ({
		listStyle: 'none',
		margin: 0,
		padding: 0,
	}));

	const ListItem = styled('li')(({ theme }) => ({
		'& a': {
			textDecoration: 'none',
			color: theme.palette.common.black,
			transition: theme.transitions.create(['color']),
			'&:hover': {
				color: alpha(theme.palette.common.black, 0.5),
			},
		},
	}));

	const footerInfo = [
		{
			columnTitle: 'Зарабатывайте с нами',
			columnInfo: [
				'Стать поставщиком',
				'Реферальная программа',
				'Начать продавать',
				'Работа курьером',
			],
		},
		{
			columnTitle: 'Помощь',
			columnInfo: ['Как сделать заказ', 'Общение в чате', 'Регистрация'],
		},
	];

	return (
		<>
			<Header />
			<Box sx={{ mx: '20px' }}>
				<Carousel
					sx={{ my: '20px' }}
					indicatorContainerProps={{ style: { marginTop: 0 } }}
					navButtonsWrapperProps={{
						style: { bottom: '20px', top: 'unset' },
					}}
				>
					{adItems.map(({ id, image }) => (
						<AdsCarouselItem key={id} image={image} />
					))}
				</Carousel>
				<Grid container spacing={2} sx={{ mt: '20px', mb: '50px' }}>
					{categoryItems.map(({ id, image, title }) => (
						<CategoryCard key={id} title={title} image={image} />
					))}
				</Grid>
				<Divider />
				<Grid container spacing={4} sx={{ my: '20px' }}>
					{footerInfo.map(({ columnTitle, columnInfo }) => (
						<Grid item xs={4}>
							<Typography mb={1} variant="h6">
								{columnTitle}
							</Typography>
							<List>
								{columnInfo.map((text) => (
									<ListItem>
										<a href="/#">{text}</a>
									</ListItem>
								))}
							</List>
						</Grid>
					))}
					<Grid item xs={4}>
						<Typography mb={1} variant="h6">
							Связаться с нами
						</Typography>
						<IconButton
							size="large"
							aria-label="ссылка на телеграм"
							color="inherit"
						>
							<TelegramIcon />
						</IconButton>
						<IconButton
							size="large"
							aria-label="ссылка на твиттер"
							color="inherit"
						>
							<TwitterIcon />
						</IconButton>
					</Grid>
				</Grid>
				<Typography sx={{ textAlign: 'right' }}>© 2022 Eshop</Typography>
			</Box>
		</>
	);
};

export default Home;

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import { IAdItem } from './AdsCarouselSlice';

const AdsCarouselItem = ({ image }: Omit<IAdItem, 'id'>) => (
	<Box>
		<Card sx={{ borderRadius: '10px', boxShadow: 'none' }}>
			<CardMedia component="img" image={image} />
		</Card>
	</Box>
);

export default AdsCarouselItem;

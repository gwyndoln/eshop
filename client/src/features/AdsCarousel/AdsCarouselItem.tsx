import Box from '@mui/material/Box';
import { IAdItem } from './AdsCarouselSlice';

const AdsCarouselItem = ({ image }: Omit<IAdItem, 'id'>) => (
	<Box
		component="img"
		alt="ad"
		src={image}
		sx={{
			maxWidth: '100%',
			height: 'auto',
			borderRadius: '20px',
		}}
	/>
);

export default AdsCarouselItem;

import Box from '@mui/material/Box';
import { IAdItem } from './AdsCarouselSlice';

const AdsCarouselItem = ({ image }: Omit<IAdItem, 'id'>) => (
	<Box
		component="img"
		alt="ad"
		src={image}
		sx={{
			width: '100%',
			minWidth: '696px',
			height: '300px',
			minHeight: '228px',
			borderRadius: '20px',
		}}
	/>
);

export default AdsCarouselItem;

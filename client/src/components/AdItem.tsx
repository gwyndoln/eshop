import Box from '@mui/material/Box';

const AdItem = ({ image }: { image: string }) => (
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

export default AdItem;

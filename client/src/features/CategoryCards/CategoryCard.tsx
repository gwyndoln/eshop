import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import { styled, alpha } from '@mui/material/styles';
import { IcategoryItem } from './CategoryCardsSlice';

const GridItem = styled(Grid)(({ theme }) => ({
	cursor: 'pointer',
	'&:hover': {
		transform: 'scale(1.05)',
		'& .MuiCardHeader-title': {
			color: alpha(theme.palette.common.black, 0.5),
		},
	},
	transition: theme.transitions.create(['color', 'transform']),
}));

const CategoryCard = ({ image, title }: Omit<IcategoryItem, 'id'>) => (
	<GridItem item xs={6} sm={3}>
		<Card sx={{ boxShadow: '0 8px 16px 0 #BDC9D7' }}>
			<CardHeader titleTypographyProps={{ variant: 'h6' }} title={title} />
			<CardMedia component="img" height="200px" image={image} alt={title} />
		</Card>
	</GridItem>
);

export default CategoryCard;

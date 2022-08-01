import { styled, alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
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

const CategoryCard = ({
	image,
	cardTitle,
	urlTitle,
}: Omit<IcategoryItem, 'id'>) => {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'));
	const matchesVariant = matches ? 'h6' : 'subtitle2';

	return (
		<GridItem item xs={12} sm={6} md={4} lg={3}>
			<Box
				component={Link}
				to={`/category/${urlTitle}`}
				sx={{ textDecoration: 'none' }}
			>
				<Card sx={{ boxShadow: '0 8px 16px 0 #BDC9D7' }}>
					<CardHeader
						titleTypographyProps={{
							variant: matchesVariant,
						}}
						title={cardTitle}
						sx={{ p: '0.5em', textAlign: 'center' }}
					/>
					<CardMedia
						component="img"
						height="200"
						image={image}
						alt={cardTitle}
					/>
				</Card>
			</Box>
		</GridItem>
	);
};

export default CategoryCard;

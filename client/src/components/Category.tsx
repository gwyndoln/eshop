import { useTheme, alpha } from '@mui/material/styles';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const Category = () => {
	const params = useParams();
	const theme = useTheme();

	return (
		<Container
			maxWidth="xl"
			sx={{ mt: '1em', display: 'flex', justifyContent: 'space-between' }}
		>
			<Box component="aside" maxWidth="xl" sx={{ mt: '1em' }}>
				<Typography>Filter</Typography>
			</Box>
			<Box component="main" sx={{ display: 'flex' }}>
				<Box sx={{ display: 'flex' }}>
					<Typography variant="h6" component="h1">
						{params.categoryTitle}
					</Typography>
					<Typography
						variant="body1"
						sx={{ ml: '0.5em', color: alpha(theme.palette.common.black, 0.5) }}
					>
						Количество товаров
					</Typography>
				</Box>
				<Box sx={{ display: 'flex' }}>
					<Grid />
				</Box>
			</Box>
		</Container>
	);
};

export default Category;

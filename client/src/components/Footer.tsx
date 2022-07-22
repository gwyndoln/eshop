import { styled, alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

const Footer = () => {
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
			'&:hover, &:focus': {
				color: alpha(theme.palette.common.black, 0.5),
			},
		},
	}));

	const footerInfo = [
		{
			id: 1,
			columnTitle: 'Зарабатывайте с нами',
			columnInfo: [
				{ cId: 1, text: 'Стать поставщиком' },
				{ cId: 2, text: 'Реферальная программа' },
				{ cId: 3, text: 'Начать продавать' },
				{ cId: 4, text: 'Работа курьером' },
			],
		},
		{
			id: 2,
			columnTitle: 'Помощь',
			columnInfo: [
				{ cId: 1, text: 'Как сделать заказ' },
				{ cId: 2, text: 'Общение в чате' },
				{ cId: 3, text: 'Регистрация' },
			],
		},
	];

	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('sm'));

	return (
		<Container component="footer" maxWidth="xl" sx={{ my: '2em' }}>
			<Grid
				container
				justifyContent="center"
				spacing={matches ? 5 : 3}
				textAlign={matches ? 'left' : 'center'}
			>
				{footerInfo.map(({ columnTitle, columnInfo, id }) => (
					<Grid key={id} item xs={12} sm="auto">
						<Typography mb={1} variant="h6">
							{columnTitle}
						</Typography>
						<List>
							{columnInfo.map(({ text, cId }) => (
								<ListItem key={cId}>
									<a href="/#">{text}</a>
								</ListItem>
							))}
						</List>
					</Grid>
				))}
				<Grid item xs={12} sm="auto">
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
					<Typography mt={2}>© 2022 Eshop</Typography>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Footer;

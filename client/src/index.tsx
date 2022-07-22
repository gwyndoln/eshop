import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {
	createTheme,
	ThemeProvider,
	responsiveFontSizes,
} from '@mui/material/styles';
import { store } from './app/store';
import App from './components/App';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</Provider>
);

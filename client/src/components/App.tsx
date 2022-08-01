import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Category from './Category';
import NotFound from './NotFound';

const App = () => (
	<>
		<CssBaseline />
		<Routes>
			<Route path="/" element={<Header />}>
				<Route index element={<Home />} />
				<Route path="category/:categoryTitle" element={<Category />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	</>
);

export default App;

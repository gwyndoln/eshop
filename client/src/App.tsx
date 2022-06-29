import Button from '@mui/material/Button';

const App = ({ str }: { str: string }) => {
	console.log(str);
	return <Button variant="contained">Hello World</Button>;
};

export default App;

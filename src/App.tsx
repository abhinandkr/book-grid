import React, {useEffect, useState} from 'react';
import './App.css';
import Grid from './ts/grid';
import axios from 'axios';

function App() {
	const [recordLength, setRecordLength] = useState(0);
	useEffect(() => {
		async function init() {
			const res = await axios.get('http://localhost:4000/api/bookGrid/init');
			const {data: {recordLength}} = res;
			setRecordLength(recordLength);
		}

		init().then(() => {
		});
	}, []);
	return (
		<div className="App">
			{recordLength > 0 && <Grid/>}
		</div>
	);
}

export default App;

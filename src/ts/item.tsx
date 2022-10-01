import {useEffect, useState} from 'react';
import axios from 'axios';
import star from '../res/star.png';

interface Props {
	isbn: string;
	rating: number;
	title: string;
}

export default function Item(props: Props) {
	const [smallThumbnail, setSmallThumbnail] = useState<string>('');
	async function fetchBookThumbnail() {
		console.log(props.title, props.isbn);

		const res = await axios.get(`http://localhost:4000/api/bookGrid/bookThumbnail/${props.isbn}`);
		const {data: {thumbnailUrl}} = res;
		setSmallThumbnail(thumbnailUrl);
	}

	useEffect(() => {
		fetchBookThumbnail().then(() => {});
	},
	[]);

	const stars = [];
	for (let i = 0; i < props.rating; i++) {
		stars.push(
			<img src={star} height={25} width={25} key={`${props.isbn}-star-${i}`}/>);
	}
	return (
		<div className={'item-div'}>
			<img src={smallThumbnail} alt={props.title}/>
			<div>
				{stars}
			</div>
		</div>
	);
}

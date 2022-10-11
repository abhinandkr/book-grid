import {useEffect, useState} from 'react';
import axios from 'axios';
import star from '../res/star.png';

interface Props {
	isbn: string;
	rating: number;
	title: string;
	coverArtUrl: string | null;
}

export default function Item(props: Props) {
	const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
	const [googleBooksUrl, setGoogleBooksUrl] = useState<string>('');

	async function fetchBookThumbnail() {

		const res = await axios.get(`http://localhost:4000/api/bookGrid/bookThumbnail/${props.isbn}`);
		const {data: {googleBookDetails: {thumbnailUrl, googleBooksUrl}}} = res;
		if (props.coverArtUrl) {
			setThumbnailUrl(props.coverArtUrl);
		} else {
			setThumbnailUrl(thumbnailUrl);
		}
		setGoogleBooksUrl(googleBooksUrl);
	}

	useEffect(() => {
		fetchBookThumbnail().then(() => {
		});
	}, []);

	const stars = [];
	for (let i = 0; i < props.rating; i++) {
		stars.push(
			<img src={star} height={25} width={25} key={`${props.isbn}-star-${i}`}/>);
	}
	return (
		<div className={'item-div'}>
			<a href={googleBooksUrl} target={'_blank'} rel={'noopener noreferrer'}>
				<img src={thumbnailUrl} alt={props.title} width={128}/>
			</a>
			<div>
				{stars}
			</div>
		</div>
	);
}

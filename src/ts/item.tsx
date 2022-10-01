import {useEffect, useState} from 'react';
import axios from 'axios';
import _ from 'lodash';
import star from '../res/star.png';

interface Props {
	isbn: string;
	rating: number;
	title: string;
}

export default function Item(props: Props) {
	const [smallThumbnail, setSmallThumbnail] = useState<string>('');
	async function fetchBookCover() {
		const {isbn} = props;
		const url = `https://www.googleapis.com/books/v1/volumes`;
		const res = await axios.get(url, {
			params: {
				key: 'AIzaSyD9PvKJYFp0YxcvOszMykAUgo58-x4VuJw',
				q: `isbn:${isbn}`,
			},
		});
		// delay().then(() => {
		//
		// });
		setSmallThumbnail(
			_.get(res, 'data.items[0].volumeInfo.imageLinks.smallThumbnail', ''));
	}

	useEffect(() => {
		fetchBookCover().then(() => {});
	},
	[]);

	const stars = [];
	for (let i = 0; i < props.rating; i++) {
		stars.push(<img src={star} height={25} width={25}/>);
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

const delay = () => {
	return new Promise((resolve) => setTimeout(resolve, 1000));
};

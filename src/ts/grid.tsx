import {Col, Row} from 'antd';
import './grid.css';
import Item from './item';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

// import img from '../res/img1.png';
interface Props {
}

export default function Grid(props: Props) {
	const [bookArray, setBookArray] = useState([]);

	useEffect(() => {
		async function getBookData() {
			const res = await axios.get('http://localhost:4000/api/bookGrid/bookData/2022');
			const {data: {bookArray}} = res;
			setBookArray(bookArray);
		}

		getBookData().then(() => {
		});
	}, []);

	return (
		<div className={'main-div'}>
			<div className={'grid-div'}>
				<Row gutter={[16, 36]}>
					{bookArray.map((book: any) => {
						const {isbn, myRating, title} = book;
						return (
							<Col className={'col'} span={6}>
								<Item isbn={isbn} rating={myRating} title={title}/>
							</Col>
						);
					})}
				</Row>
			</div>
		</div>

	);
}

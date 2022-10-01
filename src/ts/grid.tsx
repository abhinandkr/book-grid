import {Col, Row} from 'antd';
import './grid.css';
import Item from './item';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

// import img from '../res/img1.png';
interface Props {
}

export default function Grid(props: Props) {
	const [bookList, setbookList] = useState([]);

	useEffect(() => {
		async function getBookList() {
			const res = await axios.get('http://localhost:4000/api/bookGrid/readBookList/2022');
			const {data: {bookList}} = res;
			setbookList(bookList.slice(0, 2));
		}

		getBookList().then(() => {
		});
	}, []);

	return (
		<div className={'main-div'}>
			<div className={'grid-div'}>
				<Row gutter={[16, 36]}>
					{bookList.map((book: any) => {
						const {isbn, myRating, title} = book;
						return (
							<Col className={'col'} span={6} key={isbn}>
								<Item isbn={isbn} rating={myRating} title={title}/>
							</Col>
						);
					})}
				</Row>
			</div>
		</div>

	);
}

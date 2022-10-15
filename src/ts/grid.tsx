import {Col, Row, Pagination} from 'antd';
import './grid.css';
import Item from './item';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Grid() {
	const [readCount, setReadCount] = useState(0);
	const [pageNumber, setPageNumber] = useState(1);
	const [resultsPerPage, setResultsPerPage] = useState(8);
	const [bookList, setBookList] = useState([]);

	useEffect(() => {
		async function getReadCount() {
			const res = await axios.get(`http://localhost:4000/api/bookGrid/readCount/2022`);
			const {data: {readCount: rc}} = res;
			if (readCount !== rc) {
				setReadCount(rc);
			}
		}
		getReadCount().then(() => {
		});
	}, [readCount]);


	useEffect(() => {
		async function getBookList() {
			const res = await axios.get(`http://localhost:4000/api/bookGrid/readBookList/2022/${pageNumber}/${resultsPerPage}`);
			const {data: {bookList}} = res;
			setBookList(bookList);
		}
		getBookList().then(() => {
		});
	}, [pageNumber, resultsPerPage]);

	function onPageChange(pn: number, rpp: number) {
		if (pn !== pageNumber) {
			setPageNumber(pn);
		}
		if (rpp !== resultsPerPage) {
			setResultsPerPage(rpp);
		}
	}

	return (
		<div className={'main-div'}>
			<div className={'grid-div'}>
				<Row gutter={[16, 32]}>
					{bookList.map((book: any) => {
						const {isbn, myRating, title, coverArtUrl} = book;
						return (
							<Col className={'col'} span={6} key={isbn}>
								<Item
									isbn={isbn}
									rating={myRating}
									title={title}
									coverArtUrl={coverArtUrl}/>
							</Col>
						);
					})}
				</Row>
			</div>
			<div>
				<Pagination
					current={pageNumber}
					defaultCurrent={1}
					onChange={onPageChange}
					pageSize={resultsPerPage}
					pageSizeOptions={['8', '16', '32', '64', '128']}
					showSizeChanger
					showTotal={(total: number) => `Total ${total} books`}
					total={readCount}
				/>
			</div>
		</div>

	);
}

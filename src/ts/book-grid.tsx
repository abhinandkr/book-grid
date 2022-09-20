import {Col, Row} from 'antd';
import './book-grid.css';
import img from '../res/img1.png';
interface Props {
}
export default function BookGrid(props: Props) {
	return (
		<div className={'grid-div'}>
			<Row gutter={[24, 24]}>
				<Col className={'item'} span={6} />
				<Col className={'item'} span={6} />
				<Col className={'item'} span={6} />
				<Col className={'item'} span={6} />

				<Col className={'item'} span={6} />
				<Col className={'item'} span={6} />
				<Col className={'item'} span={6} />
				<Col className={'item'} span={6} />
			</Row>
		</div>
	);
}

import React from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import '../assets/css/react-blackjack.css';

function Card() {
	return (
		<Container fluid>
			<Row>
				<Col className="outline">
					<p>Put card code here</p>
				</Col>
			</Row>
		</Container>
	);
}

export default Card;
import React from 'react'
import {Col, Row} from 'react-bootstrap';
import '../assets/css/react-blackjack.css';
import cardHelper from '../assets/js/cardHelper'

/** @class Card representing a playing card. */
class Hand extends React.Component {
/**
 * Creates an instance of Card.
 *
 * @author [Kyle Silverman](https://github.com/KSilverman)
 * @author [Kalju Jake Nekvasil](https://github.com/knekvasil)
 * @param {props} attributes defined by parent component.
 */
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
			<Row justify-content-center>
				{this.props.handName}'s Cards
			</Row>
			<Row>
			{
				this.props.cardArray.map(card => (
					<Col className="outline">
						<img src={cardHelper.getCardSVG(card)} alt="" />
					</Col>
				))
			}
			</Row>
			</div>
		);
	};
}

export default Hand;
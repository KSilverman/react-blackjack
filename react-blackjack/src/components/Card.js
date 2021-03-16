import React from 'react'
import {Col} from 'react-bootstrap';
import '../assets/css/react-blackjack.css';
import cardHelper from '../assets/js/cardHelper'

/** @class Card representing a playing card. */
class Card extends React.Component {
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
			<Col className="outline">
				<img src={cardHelper.getCardSVG(this.props.cardJSON)} alt="" />
			</Col>
		);
	};
}

export default Card;
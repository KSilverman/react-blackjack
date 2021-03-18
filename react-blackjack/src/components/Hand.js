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

	renderCards() {
		var cards = [];
		for(let i = this.props.cardArray.length-1; i >= 0; i--) 
		{
			var showCard = this.props.showFirstCard

			if(!showCard && i !== this.props.cardArray.length-1)
			{ 
				showCard = !showCard 
			}

			cards.push(<img src={cardHelper.getCardSVG(this.props.cardArray[i], showCard)}  alt="" />)
		}
		return cards;
	}


	render() {
		return(
			<div>
			<Row justify-content-center>
				{this.props.handName}'s Cards
			</Row>
			<Row>
			{
				this.renderCards().map(card => (
					<Col className="outline">
						{card}
					</Col>
				))
			}
				<Col className="outline">
					Hand Value: {cardHelper.getValueOfHand(this.props.cardArray).count}
				</Col>
			</Row>
			</div>
		);
	};
}

export default Hand;

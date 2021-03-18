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
		var cardsImgs = [];
		var cardCounts = []
		for(let i = 0; i < this.props.cardArray.length; i++) 
		{
			var showCard = this.props.showFirstCard

			if(!showCard && i !== 0)
			{ 
				showCard = !showCard
			}
			
			if(showCard) { cardCounts.push(this.props.cardArray[i]) }
			
			cardsImgs.push(<img src={cardHelper.getCardSVG(this.props.cardArray[i], showCard)}  alt="" />)
		}
		return { cardsImgs, cardCounts };
	}


	render() {
		return(
			<div>
			<Row justify-content-center>
				{this.props.handName}'s Cards
			</Row>
			<Row>
			{
				this.renderCards().cardsImgs.map(card => (
					<Col className="outline">
						{card}
					</Col>
				))
			}
				<Col className="outline">
					Hand Value: {cardHelper.getValueOfHand(this.renderCards().cardCounts).count}
				</Col>
			</Row>
			</div>
		);
	};
}

export default Hand;

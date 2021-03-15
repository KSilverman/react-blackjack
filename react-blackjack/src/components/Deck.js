import React from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap';
import '../assets/css/react-blackjack.css';
import allCardJSONData from '../assets/cards.json';
import Card from '../components/Card';
import cardHelper from '../assets/js/cardHelper'

/** @class Deck representing a deck of playing cards. */
class Deck extends React.Component {
/**
 * Creates an instance of Deck of cards.
 *
 * @author [Kyle Silverman](https://github.com/KSilverman)
 * @author [Kalju Jake Nekvasil](https://github.com/knekvasil)
 * @param {props} attributes defined by parent component.
 */
	constructor (props) {
		super(props);
		var cardArray = cardHelper.getShoe(this.props.numberOfDecks)
		
		//get the first number from the random shuffled array and get its corresponding JSON card object
		var cardIndex = cardArray[0];
		var cardJSONObject = cardHelper.getCardJSONObject(allCardJSONData, cardIndex);

		this.state = {
			allCards: cardArray,
			cardJSON: cardJSONObject,
			cardsDealt: [cardHelper.getCardKey(cardJSONObject)],
			runningCount: cardHelper.getCardRunningCountValue(cardJSONObject)
		}

		//binding newCard function to the deck object itself
		this.newCard = this.newCard.bind(this)
		this.resetCards = this.resetCards.bind(this)
	}

	//sets the state of the new card to pass into Card component
	newCard() {
		if(this.state.allCards.length > 1)
		{
			//take the first element out of the randomized card index array
			this.state.allCards.shift();

			//get the first card from the new random card index array
			var currentCardIndex = this.state.allCards[0];
			var currentCardJSONObject = cardHelper.getCardJSONObject(allCardJSONData, currentCardIndex)

			//add the new card to the list of dealt cards
			this.state.cardsDealt.push(cardHelper.getCardKey(currentCardJSONObject));

			//find the running value of the new card
			var cardRunningCountValue = cardHelper.getCardRunningCountValue(currentCardJSONObject);

	      	this.setState(state => ({
	      		allCards: this.state.allCards,
	        	cardJSON: cardHelper.getCardJSONObject(allCardJSONData, currentCardIndex),
	        	cardsDealt: this.state.cardsDealt,
	        	runningCount: this.state.runningCount+cardRunningCountValue,
	      	}));
      	}
   }

    resetCards() {
    	var newCardArray = cardHelper.getShoe(this.props.numberOfDecks)

    	//get the first number from the random shuffled array and get its corresponding JSON card object
		var cardIndex = newCardArray[0];
		var cardJSONObject = cardHelper.getCardJSONObject(allCardJSONData, cardIndex);

    	this.setState(state => ({
				allCards: newCardArray,
				cardJSON: cardJSONObject,
				cardsDealt: [cardHelper.getCardKey(cardJSONObject)],
				runningCount: cardHelper.getCardRunningCountValue(cardJSONObject)
	      	}));
   		
    }

	render() {
		return(
			<Container fluid>
			<Row>
				<Col>
					<Button onClick={this.newCard} variant="primary">
						New Card
					</Button>
				</Col>
				<Col>
				 	<Button onClick={this.resetCards} variant="danger">
				 		Reset Cards
				 	</Button>
				</Col>
			</Row>
         	{
        		<Card cardJSON={this.state.cardJSON} cardsLeft={this.state.allCards.length-1} 
        		runningCount={this.state.runningCount} dealtArray={this.state.cardsDealt}/>
        	}
        </Container>
		);
	};
}

export default Deck;
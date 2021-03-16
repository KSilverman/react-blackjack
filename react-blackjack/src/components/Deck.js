import React from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap';
import '../assets/css/react-blackjack.css';
import allCardJSONData from '../assets/cards.json';
import Card from '../components/Card';
import Hand from '../components/Hand';
import GameInfo from '../components/GameInfo';
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
		var playerCards = [];
		var dealerCards = [];
		var cardsDealtOut = [];
		var rCount = 0;

		for(let i = 0; i <= (this.props.numberOfPlayers+1); i+=2)
		{
			var playerCardIndex = cardArray[i];
			console.log(cardArray[i])
			var playerCardJSONObject = cardHelper.getCardJSONObject(allCardJSONData, playerCardIndex);

			playerCards.push(playerCardJSONObject);
			cardsDealtOut.push(playerCardJSONObject);

			var dealerCardIndex = cardArray[i+1];
			console.log(cardArray[i+1])
			var dealerCardJSONObject = cardHelper.getCardJSONObject(allCardJSONData, dealerCardIndex);

			dealerCards.push(dealerCardJSONObject);
			cardsDealtOut.push(dealerCardJSONObject);

			rCount += (cardHelper.getCardRunningCountValue(playerCardJSONObject) + cardHelper.getCardRunningCountValue(dealerCardJSONObject));

		}

		var tCount = rCount/((cardArray.length-cardsDealtOut.length)/52)

		this.state = {
			allCards: cardArray,
			//cardJSON: cardJSONObject,
			playerHand: playerCards,
			dealerHand: dealerCards,
			cardsDealt: cardsDealtOut,
			runningCount: rCount,
			trueCount: tCount
		}

		//binding newCard function to the deck object itself
		this.newCards = this.newCards.bind(this)
		this.resetCards = this.resetCards.bind(this)
	}

	//sets the state of the new card to pass into Card component
	newCards() {
		if(this.state.allCards.length > ((this.props.numberOfPlayers+1)*2))
		{
			//take the n elements out of the randomized card index array
			for(let i = 1; i <= ((this.props.numberOfPlayers+1)*2); i++) {
				this.state.allCards.shift();
			}

			//reset player and dealer hands
			this.state.playerHand = [];
			this.state.dealerHand = [];
			var newRCount = 0

			for(let i = 0; i <= this.props.numberOfPlayers+1; i+=2)
			{
				//get the first card from the new random card index array
				var playerCardIndex = this.state.allCards[i];
				var playerCardJSONObject = cardHelper.getCardJSONObject(allCardJSONData, playerCardIndex);

				this.state.playerHand.push(playerCardJSONObject);
				this.state.cardsDealt.push(playerCardJSONObject);

				var dealerCardIndex = this.state.allCards[i+1];
				var dealerCardJSONObject = cardHelper.getCardJSONObject(allCardJSONData, dealerCardIndex);

				this.state.dealerHand.push(dealerCardJSONObject);
				this.state.cardsDealt.push(dealerCardJSONObject);

				newRCount += (cardHelper.getCardRunningCountValue(playerCardJSONObject) + cardHelper.getCardRunningCountValue(dealerCardJSONObject))
			}

			newRCount = newRCount + this.state.runningCount
			var newTCount = newRCount/((this.state.allCards.length-((this.props.numberOfPlayers+1)*2))/52)

	      	this.setState(state => ({
	      		allCards: this.state.allCards,
	        	//cardJSON: cardHelper.getCardJSONObject(allCardJSONData, currentCardIndex),
	        	playerHand: this.state.playerHand,
				dealerHand: this.state.dealerHand,
	        	cardsDealt: this.state.cardsDealt,
	        	runningCount: newRCount,
	        	trueCount: newTCount
	      	}));
      	}
   }

    resetCards() {
    	var newCardArray = cardHelper.getShoe(this.props.numberOfDecks)

    	//get the first number from the random shuffled array and get its corresponding JSON card object
		var playerCards = [];
		var dealerCards = [];
		var cardsDealtOut = [];
		var rCount = 0;

		for(let i = 0; i <= this.props.numberOfPlayers+1; i+=2)
		{
			var playerCardIndex = newCardArray[i];
			var playerCardJSONObject = cardHelper.getCardJSONObject(allCardJSONData, playerCardIndex);

			playerCards.push(playerCardJSONObject);
			cardsDealtOut.push(playerCardJSONObject);

			var dealerCardIndex = newCardArray[i+1];
			var dealerCardJSONObject = cardHelper.getCardJSONObject(allCardJSONData, dealerCardIndex);

			dealerCards.push(dealerCardJSONObject);
			cardsDealtOut.push(dealerCardJSONObject);

			rCount += (cardHelper.getCardRunningCountValue(playerCardJSONObject) + cardHelper.getCardRunningCountValue(dealerCardJSONObject));

		}

		var tCount = rCount/((newCardArray.length-cardsDealtOut.length)/52)

		this.setState(state => ({
			allCards: newCardArray,
			//cardJSON: cardJSONObject,
			playerHand: playerCards,
			dealerHand: dealerCards,
			cardsDealt: cardsDealtOut,
			runningCount: rCount,
			trueCount: tCount
		}));
   		
    }

	render() {
		return(
			<Container fluid>
			<Row>
				<Col>
					<Button onClick={this.newCards} variant="primary">
						New Cards
					</Button>
				</Col>
				<Col>
				 	<Button onClick={this.resetCards} variant="danger">
				 		Reset Cards
				 	</Button>
				</Col>
			</Row>

			<Hand cardArray={this.state.dealerHand} handName="Dealer" />

			<Hand cardArray={this.state.playerHand} handName="Player"/>
			
			<GameInfo cardsLeft={(this.state.allCards.length)-((this.props.numberOfPlayers+1)*2)} 
        		runningCount={this.state.runningCount} dealtArray={this.state.cardsDealt}
        		trueCount={this.state.trueCount} />

        </Container>
		);
	};
}

export default Deck;
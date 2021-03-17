import React from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap';
import '../assets/css/react-blackjack.css';
import allCardJSONData from '../assets/cards.json';
import Card from '../components/Card';
import Hand from '../components/Hand';
import GameInfo from '../components/GameInfo';
import cardHelper from '../assets/js/cardHelper'

/** @class Game representing a blackjack game. */
class Game extends React.Component {
/**
 * Creates an instance of a blackjack game.
 *
 * @author [Kyle Silverman](https://github.com/KSilverman)
 * @author [Kalju Jake Nekvasil](https://github.com/knekvasil)
 * @param {props} attributes defined by parent component.
 */
	constructor (props) {
		super(props);

		this.state = {
			allCards: [],
        	playerHand: [],
			dealerHand: [],
        	cardsDealt: [],
        	runningCount: 0,
        	trueCount: 0,
        	winner: "",
        	wins: {
        		"playerWins": 0,
        		"dealerWins": 0,
        		"ties": 0
        	},
        	playerTurn: true,
        	isGameOver: true,
        	isStartOver: true,
		}

		//binding functions to the Game component itself
		this.dealShoe = this.dealShoe.bind(this)
		this.newDeal = this.newDeal.bind(this)
		this.hit = this.hit.bind(this)
		this.doubleDown = this.doubleDown.bind(this)
		this.stayPlayer = this.stayPlayer.bind(this)
	}

	newDeal() {
		if(this.state.allCards.length > ((this.props.numberOfPlayers+1)*2))
		{

			//var gameOver = false;
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

			var playerHandContents = cardHelper.getValueOfHand(this.state.playerHand)
			var dealerHandContents = cardHelper.getValueOfHand(this.state.dealerHand)

			var gameResult = cardHelper.evalutateInitialDeal(playerHandContents, dealerHandContents, this.state.wins.playerWins, this.state.wins.dealerWins, this.state.wins.ties)

			//take the n elements out of the randomized card index array
			for(let i = 1; i <= ((this.props.numberOfPlayers+1)*2); i++) {
				this.state.allCards.shift();
			}

	      	this.setState(state => ({
	      		allCards: this.state.allCards,
	        	playerHand: this.state.playerHand,
				dealerHand: this.state.dealerHand,
	        	cardsDealt: this.state.cardsDealt,
	        	runningCount: newRCount,
	        	trueCount: newTCount,
	        	winner: gameResult.gameWinner,
	        	wins: {
	        		"playerWins": gameResult.playerWins,
	        		"dealerWins": gameResult.dealerWins,
	        		"ties": gameResult.ties
	        	},
	        	playerTurn: true,
	        	isGameOver: gameResult.gameOver
	      	}));
      	}
   }

	hit() {

		var isPlayerTurn = this.state.playerTurn

	   	var newDrawnCardIndex = this.state.allCards[0];
	   	var newDrawnCardJSONObject = cardHelper.getCardJSONObject(allCardJSONData, newDrawnCardIndex);

	   	var newRCount = cardHelper.getCardRunningCountValue(newDrawnCardJSONObject) + this.state.runningCount
	   	var newTCount = newRCount/((this.state.allCards.length-1)/52)

	   	this.state.allCards.shift();

	   	var gameResult;

	   	//it's the player's turn
	   	if(isPlayerTurn) 
	   	{
	   		this.state.playerHand.push(newDrawnCardJSONObject)
	   		var playerHandContents = cardHelper.getValueOfHand(this.state.playerHand)
	   		gameResult = cardHelper.evaluateBust(isPlayerTurn, playerHandContents, this.state.wins.playerWins, this.state.wins.dealerWins, this.state.wins.ties)

	   	} 
	   	//it's the dealer's turn
	   	else 
	   	{
	   		this.state.dealerHand.push(newDrawnCardJSONObject)
	   		var dealerHandContents = cardHelper.getValueOfHand(this.state.dealerHand)

	   		gameResult = cardHelper.evaluateBust(isPlayerTurn, dealerHandContents, this.state.wins.playerWins, this.state.wins.dealerWins, this.state.wins.ties)
	   		
	   		if(!gameResult.didBust) {
	   			var playerHandContents = cardHelper.getValueOfHand(this.state.playerHand)
	   			gameResult = cardHelper.evaluateWinner(this.props.hitOnSoft17, playerHandContents, dealerHandContents, this.state.wins.playerWins, this.state.wins.dealerWins, this.state.wins.ties)
	   		}

	   	}

	   	this.setState(state => ({
	  		allCards: this.state.allCards,
	    	playerHand: this.state.playerHand,
			dealerHand: this.state.dealerHand,
	    	cardsDealt: this.state.cardsDealt,
	    	runningCount: newRCount,
	    	trueCount: newTCount,
	    	winner: gameResult.gameWinner,
	    	wins: {
	    		"playerWins": gameResult.playerWins,
	    		"dealerWins": gameResult.dealerWins,
	    		"ties": gameResult.ties,
	    	},
	    	playerTurn: isPlayerTurn,
	    	isGameOver: gameResult.gameOver
	  	}));
	}

	doubleDown() {

	   	var newDrawnCardIndex = this.state.allCards[0];
	   	var newDrawnCardJSONObject = cardHelper.getCardJSONObject(allCardJSONData, newDrawnCardIndex);

	   	var newRCount = cardHelper.getCardRunningCountValue(newDrawnCardJSONObject) + this.state.runningCount
	   	var newTCount = newRCount/((this.state.allCards.length-1)/52)

	   	this.state.allCards.shift();

	   	this.state.playerHand.push(newDrawnCardJSONObject)
   		var playerHandContents = cardHelper.getValueOfHand(this.state.playerHand)
   		var gameResult = cardHelper.evaluateBust(true, playerHandContents, this.state.wins.playerWins, this.state.wins.dealerWins, this.state.wins.ties)
   		
   		if(!gameResult.didBust) {
   			var dealerHandContents = cardHelper.getValueOfHand(this.state.dealerHand)
   			gameResult = cardHelper.evaluateWinner(this.props.hitOnSoft17, playerHandContents, dealerHandContents, this.state.wins.playerWins, this.state.wins.dealerWins, this.state.wins.ties)
   		}

   		this.setState(state => ({
	  		allCards: this.state.allCards,
	    	playerHand: this.state.playerHand,
	    	cardsDealt: this.state.cardsDealt,
	    	runningCount: newRCount,
	    	trueCount: newTCount,
	    	winner: gameResult.gameWinner,
	    	wins: {
	    		"playerWins": gameResult.playerWins,
	    		"dealerWins": gameResult.dealerWins,
	    		"ties": gameResult.ties,
	    	},
	    	playerTurn: false,
	    	isGameOver: gameResult.gameOver
  		}));
}

	stayPlayer() {

	   	var playerHandContents = cardHelper.getValueOfHand(this.state.playerHand)
		var dealerHandConents = cardHelper.getValueOfHand(this.state.dealerHand)

		var gameResult = cardHelper.evaluateWinner(this.props.hitOnSoft17, playerHandContents ,dealerHandConents, this.state.wins.playerWins, this.state.wins.dealerWins, this.state.wins.ties)

		this.setState(state => ({
	  		winner: gameResult.gameWinner,
	    	wins: {
	    		"playerWins": gameResult.playerWins,
	    		"dealerWins": gameResult.dealerWins,
	    		"ties": gameResult.ties
	    	},
	    	playerTurn: false,
	    	isGameOver: gameResult.gameOver
	  	}));

	}

    dealShoe() {
    	var newCardArray = cardHelper.getShoe(this.props.numberOfDecks)

    	//var gameOver = false;
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
		var playerHandContents = cardHelper.getValueOfHand(playerCards);
		var dealerHandContents = cardHelper.getValueOfHand(dealerCards);

		var gameResult = cardHelper.evalutateInitialDeal(playerHandContents, dealerHandContents, 0, 0, 0)

		for(let i = 1; i <= ((this.props.numberOfPlayers+1)*2); i++) {
			newCardArray.shift();
		}

		this.setState(state => ({
			allCards: newCardArray,
			//cardJSON: cardJSONObject,
			playerHand: playerCards,
			dealerHand: dealerCards,
			cardsDealt: cardsDealtOut,
			runningCount: rCount,
			trueCount: tCount,
			winner: gameResult.gameWinner,
			wins: {
				"playerWins": gameResult.playerWins,
				"dealerWins": gameResult.dealerWins,
				"ties": gameResult.ties
			},
			playerTurn: true,
			isGameOver: gameResult.gameOver,
			isStartOver: false,
		}));
   		
    }

	render() {
		return(
			<Container fluid>
			<Row>
				<Col>
					<Button onClick={this.newDeal} variant="primary" disabled={this.state.isStartOver || !this.state.isGameOver}>
						New Deal
					</Button>
				</Col>
				<Col>
				 	<Button onClick={this.dealShoe} variant="danger">
				 		New Shoe
				 	</Button>
				</Col>
			</Row>

			<Hand cardArray={this.state.dealerHand} handName="Dealer" />

			<Row>
				<Col>
					<Button onClick={this.hit} variant="success" id="dealerHitButton" disabled={this.state.playerTurn || this.state.isGameOver}>
				 		Hit Dealer
				 	</Button>
				</Col>
			</Row>

			<Row className="dividingLine"></Row>

			<Hand cardArray={this.state.playerHand} handName="Player"/>

			<Row>
				<Col>
					<Button onClick={this.hit} variant="success" disabled={!this.state.playerTurn || this.state.isGameOver}>
				 		Hit Player
				 	</Button>
				</Col>
				<Col>
					<Button onClick={this.doubleDown} variant="info" disabled={!this.state.playerTurn || this.state.isGameOver}>
				 		Double Down
				 	</Button>
				</Col>
				<Col>
				 	<Button onClick={this.stayPlayer} disabled={!this.state.playerTurn || this.state.isGameOver} variant="warning">
				 		Stay
				 	</Button>
				</Col>
			</Row>

			<GameInfo cardsLeft={this.state.allCards.length} 
        		runningCount={this.state.runningCount} trueCount={this.state.trueCount} winner={this.state.winner}
        		wins={this.state.wins}/>

        </Container>
		);
	};
}

export default Game;
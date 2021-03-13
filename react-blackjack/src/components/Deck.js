import React from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap';
import '../assets/css/react-blackjack.css';
import data from '../assets/cards.json';
import Card from '../components/Card';

//Gets card json object from index of card json array
function getCardData(json_data, index) {
    var cardData = json_data[index]
    return cardData; 
}

//Genrates random array from 0 to N
function shuffle(len) {
    var o = Array.from(Array(len).keys())
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

var cards = shuffle(52);

class Deck extends React.Component {
	constructor (props) {
		super(props);
		//set current state to random card json object
		this.state = {
			info: getCardData(data, cards[0])
		}

		//binding newcard function to the deck object itself
		this.newcard = this.newcard.bind(this)
	}

	//sets the state of the new card to pass into Card component
	newcard() { 
		cards.shift()
      	this.setState(state => ({
        info: getCardData(data, cards[0])
      }));
   }

	render() {
		return(
			<Container>
			<Row>
				<Col>
					<Button onClick={this.newcard} variant="danger">
						New Card
					</Button>
				</Col>
			</Row>
         	{
        		<Card card_info={this.state.info} num={cards.length} />
        	}
        </Container>
		);
	};
}

export default Deck;
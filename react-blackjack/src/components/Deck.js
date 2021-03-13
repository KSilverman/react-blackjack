import React from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap';
import '../assets/css/react-blackjack.css';
import data from '../assets/cards.json';
import Card from '../components/Card';

function getCardData(json_data, index) {
    var cardData = json_data[index]
    return cardData; 
}

function shuffle(len) {
    var o = Array.from(Array(len).keys())
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

class Deck extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			info: getCardData(data, shuffle(52)[0])
		}

		this.newcard = this.newcard.bind(this)
	}

	newcard() {
      this.setState(state => ({
        info: getCardData(data, shuffle(52)[0])
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
        		<Card card_info={this.state.info} />
        	}
        </Container>
		);
	};
}

export default Deck;
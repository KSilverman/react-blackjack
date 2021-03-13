import React from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap';
import '../assets/css/react-blackjack.css';

/*
Format example --> this.props.card_data = {"2H":{"name":"2","value"=[2],"suit"="Hearts"}}
Object.keys(this.props.card_data) = "2H"
this.props.card_data[Object.keys(card_data)] = {"name":"2","value"=[2],"suit"="Hearts"}
*/

// From example, returns {"name":"2","value"=[2],"suit"="Hearts"}
function getCardDataFromKey(data, string) {
	var key = data[Object.keys(data)];
	if(!string) { return key; }
	return JSON.stringify(key);
}

//imports image string for "2H"
function getCardPic(json_data) {
	return require('../assets/img/'+Object.keys(json_data)+'.svg')
}

class Card extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<Row className="outline">
				<Col>
					{ getCardDataFromKey(this.props.card_info, true) }
				</Col>
				<Col>
					<img src={getCardPic(this.props.card_info)} alt="" />
				</Col>
			</Row>
		);
	};
}

export default Card;
import React from 'react'
import {Row, Col} from 'react-bootstrap';
import '../assets/css/react-blackjack.css';
import cardHelper from '../assets/js/cardHelper'

class GameInfo extends React.Component {
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
				<Row className="outline">
					<Col>
						Running Count: {this.props.runningCount}
					</Col>
					<Col>
						True Count: {Math.round((this.props.trueCount + Number.EPSILON) * 100) / 100}
					</Col>
					<Col> 
						Decks Remaining: {Math.round(((this.props.cardsLeft/52) + Number.EPSILON) * 100) / 100}
					</Col>
					<Col>
						Cards Dealt: {}
					</Col>
					<Col>
						Cards remaining: {this.props.cardsLeft}
					</Col>
				</Row>
			</div>
		);
	};
}

export default GameInfo;
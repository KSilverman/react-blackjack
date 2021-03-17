const helpers = {

	/**
	* Returns randomized shoe made up of number of desired decks.
	*
	* @param {number} numberOfDecks - The amount of decks to add to shoe.
	* @return {array} random array of Card indexes (0-51) * number of decks.
	*/

	getShoe: function (numberOfDecks) {
		var shoeArray = []
		for(let i = 0; i < numberOfDecks; i++){
			var o = Array.from(Array(52).keys());
			shoeArray = shoeArray.concat(o)
		}

		for(let i = shoeArray.length-1;i > 0; i--){
  			const j= Math.floor(Math.random() * i)
  			var holder = shoeArray[i]

  			shoeArray[i] = shoeArray[j]
  			shoeArray[j] = holder
		}
		return shoeArray
	},


	/**
	* Returns array on unique numbers 0-N in random order.
	*
	* @param {number} len - The length of the array.
	* @return {array} random array of unique numbers from 0-len.
	*/
    shuffle: function (len) {
		var o = Array.from(Array(len).keys());
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	},

	/**
	* Returns the JSON data for a card given an index from the list of JSON cards.
	*
	* @param {Object} allCardJSONData - the list of JSON cards.
	* @param {number} cardIndex - the index of the card in the JSON cards list.
	* @return {Object} the card JSON data [return={ "2H":{ "name": "2", "value": [2], "suit": "heart" }}].
	*/
    getCardJSONObject: function (allCardJSONData, cardIndex) {
	    var cardJSONData = allCardJSONData[cardIndex];
	    return cardJSONData; 
	},

	/**
	* Returns the JSON data for a given JSON card object.
	*
	* @param {Object} cardJSONObject - the JSON card object [cardJSONObject={ "2H":{ "name": "2", "value": [2], "suit": "heart" }}].
	* @param {boolean} stringifyJSON - true = return JSON string, false = return JSON object.
	* @return {(Object|string)} the card JSON data for a given card JSON object [return={ "name": "2", "value": [2], "suit": "heart" }].
	*/
    getCardDataFromJSONObject: function (cardJSONObject, stringifyJSON) {
		var cardValueJSON = cardJSONObject[Object.keys(cardJSONObject)];
		if(!stringifyJSON) { return cardValueJSON; }
		return JSON.stringify(cardValueJSON);
	},

	/**
	* Returns the key as a string of a given card JSON object
	*
	* @param {Object} cardJSONObject - the JSON card object [cardJSONObject={ "2H":{ "name": "2", "value": [2], "suit": "heart" }}].
	* @return {string} the key of a card JSON object [return="2H"].
	*/
	getCardKey: function(cardJSONObject) {
		return Object.keys(cardJSONObject)[0];
	},

	/**
	* Returns the module of the picture for a given JSON card object
	*
	* @param {Object} cardJSONObject - the JSON card object [cardJSONObject={ "2H":{ "name": "2", "value": [2], "suit": "heart" }}].
	* @return {module.exports} the module exportation of the SVG file [return="2H.svg"].
	*
	* More info --> https://www.freecodecamp.org/news/require-module-in-node-js-everything-about-module-require-ccccd3ad383/
	*/
	getCardSVG: function (cardJSONObject) {
		return require('../img/'+Object.keys(cardJSONObject)[0]+'.svg')
	},

	/**
	* Returns the value array of a given card
	*
	* @param {Object} cardJSONObject - the JSON card object [cardJSONObject={ "2H":{ "name": "2", "value": [2], "suit": "heart" }}].
	* @return {number} the value array of the card [return=[2]].
	*/
	getCardValueArray: function (cardJSONObject) {
		return cardJSONObject[Object.keys(cardJSONObject)].value
	},


	/**
	* Returns the value of the current hand
	*
	* @param {Array[Object]} cardArray - Array of current cards in hand.
	* @return {number} The count of the current hand.
	*/
	getValueOfHand: function (cardArray) {
		var count = 0
		var aceCount = 0
		var containsAce = false

		for (let i = 0; i < cardArray.length; i++) {
			var card = cardArray[i]
			var cardValueArray = card[Object.keys(card)].value
			if(cardValueArray[0] <= 1 || cardValueArray[1] >= 11) {
				aceCount++
				containsAce = true
			}else{
				count += cardValueArray[0]
			}
		}
		
		for (let i = aceCount ; i > 0; i--) {
			if(count + 11 <= 21 && i < 2) {
				count+=11
			} else { 
				count++ 
			}
		}
		return { count, containsAce }

	},


	/**
	* Returns the running value of the card; either -1,0,1
	*
	* @param {Object} cardJSONObject - the JSON card object [cardJSONObject={ "2H":{ "name": "2", "value": [2], "suit": "heart" }}].
	* @return {number} the running count value of a card.
	*/
	getCardRunningCountValue: function (cardJSONObject) {
		var cardJSONObjectValue = cardJSONObject[Object.keys(cardJSONObject)]
		var valueArray = cardJSONObjectValue.value;
		for(let i = 0; i < valueArray.length; i++)
		{
			let cardValue = valueArray[i];
			if(cardValue <= 1 || cardValue >= 10)
			{
				return -1;
			}
			else if(cardValue >= 2 && cardValue <= 6)
			{
				return 1;
			}
			else
			{
				return 0;
			}
		}
	},

	evalutateInitialDeal: function(playerCards, dealerCards, playerWins, dealerWins, ties) {
		var theNewWinner = ""
		var gameOver = false
		var playerHandCount = playerCards.count
		var dealerHandCount = dealerCards.count

		//if there is 21
		if(playerHandCount === 21 || dealerHandCount === 21)
		{
			//if the player has 21 and the dealer does not
			if(playerHandCount > dealerHandCount)
			{
				theNewWinner = "player"
				playerWins++;
			}
			//both the player and the dealer have 21
			else if(playerHandCount === dealerHandCount) {
				theNewWinner = "tie";
				ties++
			}
			//the dealer has 21 and the player does not
			else
			{
				theNewWinner = "dealer"
				dealerWins++;
			}
			gameOver = true;
		}

		return {
			gameWinner: theNewWinner,
			playerWins: playerWins,
			dealerWins: dealerWins,
			ties: ties,
			gameOver: gameOver
		}
	},

	evaluateBust: function(playerTurn, cards, playerWins, dealerWins, ties) {
		var didBust = false;
		var theNewWinner = ""
		var gameOver = false;

		var handValue = cards.count;

		if(handValue > 21) 
   		{
   			//busted
   			didBust = true;
   			theNewWinner = (playerTurn) ? "dealer" : "player"
   			if(theNewWinner == "dealer") { dealerWins++ } else { playerWins++ }
   			gameOver = true
   		}

		return {
			didBust: didBust,
			gameWinner: theNewWinner,
			playerWins: playerWins,
			dealerWins: dealerWins,
			ties: ties,
			gameOver: gameOver
		};
	},

	evaluateWinner: function(hitOnSoft17, playerCards, dealerCards, playerWins, dealerWins, ties) {
		var theNewWinner = ""
		var gameOver = false
		var playerHandCount = playerCards.count
		var dealerHandCount = dealerCards.count
		var dealerHandContainsAce = dealerCards.containsAce

		if(dealerHandCount >= 17 && dealerHandCount <= 21)
   		{
   			if(!(hitOnSoft17 && dealerHandCount === 17 && dealerHandContainsAce))
   			{
				if(playerHandCount > dealerHandCount)
				{
					theNewWinner = "player"
					playerWins++;
				}
				else if(playerHandCount === dealerHandCount) {
					theNewWinner = "tie";
					ties++
				}
				else
				{
					theNewWinner = "dealer"
					dealerWins++;
				}
				gameOver = true;
			}
		}

		return {
			gameWinner: theNewWinner,
			playerWins: playerWins,
			dealerWins: dealerWins,
			ties: ties,
			gameOver: gameOver
		};
	}
}

export default helpers;
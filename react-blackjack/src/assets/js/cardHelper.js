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
	* Returns the key as a string of a given card JSON object
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
	}
}

export default helpers;
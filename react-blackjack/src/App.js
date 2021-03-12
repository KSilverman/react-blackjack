import logo from './logo.svg';
import './App.css';
import './assets/css/react-blackjack.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import data from './assets/cards.json'
import Card from './components/Card'


function App() {

  // gets one card object from card json array given an index
  // output example --> {"2H":{"name":"2","value"=[2],"suit"="Hearts"}}
  function getCardData(json_data, index) {
    var cardData = json_data[index]
    return cardData; 
  }

  //populates 0-N in a random order into an array
  function shuffle(len) {
    var o = Array.from(Array(len).keys())
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Container>
          {
             shuffle(52).map(randomNum => (
              <Card card_data={getCardData(data, randomNum)} />
            ))
          }
        </Container>
      </header>
    </div>
  );
}

export default App;

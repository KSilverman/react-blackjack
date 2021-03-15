import './App.css';
import './assets/css/react-blackjack.css'
import Deck from './components/Deck'
import cardHelper from './assets/js/cardHelper'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Deck numberOfDecks={4}/>
      </header>
    </div>
  );
}

export default App;

import './App.css';
import './assets/css/react-blackjack.css'
import Game from './components/Game'
import cardHelper from './assets/js/cardHelper'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Game numberOfDecks={6} numberOfPlayers={1} hitOnSoft17={false}/>
      </header>
    </div>
  );
}

export default App;

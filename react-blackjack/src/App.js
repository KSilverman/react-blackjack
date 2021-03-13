import logo from './logo.svg';
import './App.css';
import './assets/css/react-blackjack.css'
import Deck from './components/Deck'


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Deck />
      </header>
    </div>
  );
}

export default App;

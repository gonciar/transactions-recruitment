import './App.css';
import { Navbar } from './components/Navbar';
import { TransactionsList } from './components/TransactionsList';

function App() {
  return (
    <div className="App">
      <Navbar />
      <TransactionsList />
    </div>
  );
}

export default App;

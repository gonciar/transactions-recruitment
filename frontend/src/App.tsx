import './App.css';
import { Navbar } from './components/Navbar';
import { Transactions } from './components/Transactions';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Transactions />
    </div>
  );
}

export default App;

import { useState } from 'react';
import './App.css';
import MainMint from './MainMint';
import NavBar from './NavBar';


const App = () => {
  //this allows us that any visual elements that change any button click that updates ui react hook will know
  //to render the changes
  const [accounts, setAccounts] = useState([]);
  return (
    <div className="overlay">
      <div className="App">
        {/* this component can use same states that we have created above */}
        <NavBar accounts={accounts} setAccounts={setAccounts} />
        <MainMint accounts={accounts} setAccounts={setAccounts} />
      </div>
      <div className='moving-background'></div>
    </div>
  )
}

export default App;

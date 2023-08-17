import logo from './logo.svg';
import './App.css';
import Header from './Features/Header/Container/Header';
import Routers from './Routes/Routers';

function App() {
  return (
    <div className="App">
      {/* <h3>Interview Master</h3> */}
      <Header />
      <Routers />
    </div>
  );
}

export default App;

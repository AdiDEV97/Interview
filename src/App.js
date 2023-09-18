import logo from './logo.svg';
import './App.css';
import Header from './Features/Header/Container/Header';
import Routers from './Routes/Routers';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      {/* <h3>Interview Master</h3> */}
      <ToastContainer autoClose={5000} hideProgressBar />
      <Header />
      <Routers />
    </div>
  );
}

export default App;

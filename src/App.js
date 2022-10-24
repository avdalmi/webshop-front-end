import './App.css';
import Homepage from './pages/Homepage';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import DetailsPage from './pages/DetailsPage';
import Shop from './pages/Shop';


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={ <Homepage /> } />
        <Route path="/shop" element={ <Shop /> } />
        <Route path="/details/:id" element={ <DetailsPage /> } />
      </Routes>
    </>
  );
}

export default App;
import './App.css';
import Homepage from './pages/Homepage';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import DetailsPage from './pages/DetailsPage';
import Shop from './pages/Shop';
import Footer from './components/Footer';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={ <Homepage /> } />
        <Route path="/shop" element={ <Shop /> } />
        <Route path="/details/:id/*" element={ <DetailsPage /> } />
        <Route path="/contact" element={ <ContactPage /> } />
        <Route path="/login" element={ <LoginPage /> } />
      </Routes>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {/* <Footer /> */ }
    </>
  );
}

export default App;
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
 import "slick-carousel/slick/slick-theme.css";
 import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <ToastContainer />
      <Header />
      <Hero />

    </div>
  );
}

export default App;

import React, { useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'Мой Блог';
  }, []);
  return (
    <div>
      <Header />
      <div className="container">
      </div>
      <Footer />
    </div>
  );
}

export default Home;

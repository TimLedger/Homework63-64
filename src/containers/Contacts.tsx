import React, { useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Contacts: React.FC = () => {
  useEffect(() => {
    document.title = 'Контакты';
  }, []);
  return (
    <div>
      <Header />
      <div className="container">
        <div className="page-body">
          <h2>Контакты</h2>
          
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contacts;

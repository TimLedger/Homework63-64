import React, { useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const AddPost: React.FC = () => {
  useEffect(() => {
    document.title = 'Добавить пост';
  }, []);
  return (
    <div>
      <Header />
      <div className="container">
        <h2>Добавить пост</h2>
      </div>
      <Footer />
    </div>
  );
}

export default AddPost;
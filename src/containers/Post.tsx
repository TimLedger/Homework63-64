import React, { useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Post: React.FC = () => {
  useEffect(() => {
    document.title = 'Пост';
  }, []);
  return (
    <div>
      <Header />
      <div className="container">
        <div className="page-body">
          
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Post;
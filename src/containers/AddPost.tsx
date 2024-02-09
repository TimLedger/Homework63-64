import React from 'react';
import Header from '../components/Header/Header';
import FormPosts from '../components/FormPosts/FormPosts';
import Footer from '../components/Footer/Footer';

const AddPost: React.FC = () => {
  document.title = 'Добавить пост'

  return (
    <div>
      <Header />
      <div className="container">
        <div className="page-body">
          <h2>Добавить пост</h2>  
          <FormPosts />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddPost;
import React from 'react';
import Header from '../components/Header/Header';
import FormPosts from '../components/FormPosts/FormPosts';
import Footer from '../components/Footer/Footer';
import { useParams } from 'react-router-dom';

const AddPost: React.FC = () => {
  const params = useParams();

  if (params.id) {
    document.title = 'Изменить пост';
  } else {
    document.title = 'Добавить пост';
  }

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